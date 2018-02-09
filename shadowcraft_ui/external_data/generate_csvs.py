#!/usr/bin/env python3

import os
import subprocess
import shutil
import csv
import datetime
import glob
import sys

os.environ['PYTHONIOENCODING'] = 'utf-8'
SCRIPT_DIR=os.path.dirname(os.path.realpath(__file__))
os.chdir(SCRIPT_DIR)

if not os.path.exists('csv_temp'):
    os.mkdir('csv_temp')
os.chdir('csv_temp')

# We use some tools from simc to do the actual data retrieval and extraction. You can either
# pass in a path to a clone of the repo, or we clone it here.
print('Gathering casc_extract and dbc_extract tools from simc')
simc_path = ''
if len(sys.argv) > 1:
    simc_path = sys.argv[1]
    shutil.copytree(os.path.join(simc_path, 'dbc_extract3'), 'dbc_extract3')
    shutil.copytree(os.path.join(simc_path, 'casc_extract'), 'casc_extract')
else:
    cmd = ['git', 'clone', '-b', 'bfa-dev', '--single-branch', 'https://github.com/simulationcraft/simc.git', 'simc']
    subprocess.call(cmd)
    shutil.move(os.path.join('simc','dbc_extract3'), '.')
    shutil.move(os.path.join('simc','casc_extract'), '.')
    shutil.rmtree('simc')

# Pull down all of the client data in CASC format from the Blizzard CDN. This will
# result in a bunch of db2 files that we can parse further.
print('Extracting casc data from the CDN...')
if not os.path.exists('casc_data'):
    os.mkdir('casc_data')
os.chdir('casc_extract')
with open(os.path.join('..','casc_data','extract.log'), 'w') as log:
    cmd = ['./casc_extract.py', '-m', 'batch', '--cdn', '--beta', '-o', '../casc_data']
    retval = subprocess.call(cmd, stdout=log)
    if retval != 0:
        print('Failed to retrieve CDN data, so we have to give up here')
        os.chdir(SCRIPT_DIR)
#        shutil.rmtree('csv_temp')
        sys.exit(retval)

os.chdir('..')

# Grab some information about the version and build that we just got data for. We
# need this so that we can extract the data properly from the db2 files.
CDN_VERSION=''
with open(os.path.join('casc_data','extract.log'), 'r') as log:
    for line in log:
        if line.startswith('Current build version'):
            CDN_VERSION = line.split(':')[1].strip().split()[0]
            break

BUILD_NUMBER = CDN_VERSION.split('.')[-1]
CASC_DATA_DIR=os.path.join(os.getcwd(), 'casc_data', CDN_VERSION, 'DBFilesClient')

# Use dbc_extract3 from simc to turn the db2 files into csv files for use in the python
# data models.
if not os.path.exists('csvs'):
    os.mkdir('csvs')
os.chdir('dbc_extract3')
environ = os.environ
environ['PYTHONIOENCODING'] = 'utf-8'

for item in ['ItemUpgrade','RulesetItemUpgrade','ItemBonus','ItemNameDescription','RandPropPoints','ItemSparse','ItemDamageOneHand','AzeriteItem','AzeriteEmpoweredItem','AzeritePower','AzeritePowerSetMember']:
   output = open(os.path.join('..','csvs','%s.dbc.csv' % item), 'w')
   print("Generating CSV for %s ..." % item)
   cmd = ['./dbc_extract.py', '-b', BUILD_NUMBER, '-p', CASC_DATA_DIR, '-t', 'csv', '--delim=,', item]
   subprocess.call(cmd, stdout=output, env=environ)
   output.close()

os.chdir('../csvs')

# ItemSparse comes with data for every single item in the game. We obviously don't need
# all of this data. Kill off a bunch of the items (anything < 650 ilvl) and a bunch of
# the fields for each item that we don't use.
with open('ItemSparse.dbc.csv', 'r', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile, delimiter=',', skipinitialspace=True)

    unused_fields = ["unk_1","unk_2","unk_3","buy_price","sell_price","race_mask","req_spell","max_count","stackable","ranged_mod_range","req_skill","req_skill_rank","req_rep_faction","page_text","start_quest","id_lock","item_set","area","map","totem_category","item_limit_category","id_holiday","unk_l72_1","id_name_desc","bag_family","duration","req_level","unk_4","unk_5","req_rep_rank","container_slots","bonding","id_lang","page_mat","material","sheath","socket_color_1","socket_color_2","socket_color_3","unk_6","unk_7","id_artifact","unk_9"]

    good_fields = [x for x in reader.fieldnames if x not in unused_fields]

    with open('updated.csv', 'w', newline='') as output:
        writer = csv.DictWriter(output, fieldnames=good_fields)
        writer.writeheader()
        for row in reader:
            ilvl = int(float(row['ilevel']))
            if ilvl >= 650 and ilvl != 65535:
                for field in unused_fields:
                    row.pop(field, None)
                writer.writerow(row)

os.rename('updated.csv','ItemSparse.dbc.csv')

os.chdir(SCRIPT_DIR)
for f in glob.glob(os.path.join('csv_temp','csvs','*.csv')):
    path = os.path.join(SCRIPT_DIR, os.path.basename(f))
    if os.path.exists(path):
        os.remove(path)
    shutil.move(f, SCRIPT_DIR)

with open('README.txt', 'w') as readme:
    readme.write("Regenerate these files with the 'generate_csv.py' script")
    readme.write("")
    readme.write("Current files generated on %s for build %s" % (str(datetime.datetime.now()), CDN_VERSION))

shutil.rmtree('csv_temp')
