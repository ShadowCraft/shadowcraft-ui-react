from . import ArmoryDocument

def get(region, spell_id):
    json_data = ArmoryDocument.get(region, '/wow/spell/%d' % spell_id)
    return {'id': spell_id,
            'name': json_data['name'],
            'icon': json_data['icon']}

def test_spell():
    print(get('us', 209782))

if __name__ == '__main__':
    test_spell()
