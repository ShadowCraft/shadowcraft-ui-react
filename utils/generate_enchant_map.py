import csv
import json

# the csv data doesn't have proper names, icons or spellid, need to do something else
# probably need to scrap wowhead :/


with open('../shadowcraft_ui/external_data/SpellItemEnchantment.dbc.csv') as file:
    reader = csv.DictReader(file)
    enchants_dict = {}
    for row in reader:
        if int(row['max_scaling_level']) >= 100:
            enchants_dict[(row['id'])] = row['desc'].replace("'", "")
    json_string = 'let EnchantMap = ' + json.dumps(enchants_dict)
    print(json_string)