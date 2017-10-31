# -*- coding: utf-8 -*-

import csv
import os

class ArmoryCharacter(object):

    artifact_ids = None

    # Maps the a trait ID from the artifact data to a spell ID using the DBC data
    # from the Blizzard CDN
    @staticmethod
    def artifact_id(trait_id):
        # The header on the ArtifactPowerRank data looks like (as of 7.0.3):
        # id,id_spell,value,id_power,f5,index
        # We're mapping between id_power and id_spell
        if ArmoryCharacter.artifact_ids is None:
            ArmoryCharacter.artifact_ids = {}
            with open(os.path.join(os.getcwd(),'shadowcraft_ui','external_data','ArtifactPowerRank.dbc.csv'), mode='r') as infile:
                reader = csv.DictReader(infile)
                for row in reader:
                    ArmoryCharacter.artifact_ids[int(row['id_power'])] = int(row['id_spell'])

        return ArmoryCharacter.artifact_ids[trait_id] if trait_id in ArmoryCharacter.artifact_ids else 0
