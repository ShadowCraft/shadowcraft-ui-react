from . import ArmoryDocument

def get(region='us'):
    talents = {'a': [], 'Z': [], 'b': []}
    json_data = ArmoryDocument.get(region, '/wow/data/talents')

    for tier in json_data['4']['talents']:
        for column in tier:

            # Loop through each column, looking to see if we have special
            # talents for any of the specs. Also store any talents that
            # have no spec associated with it.
            for talent in column:
                new_t = {'tier': talent['tier'],
                         'column': talent['column'],
                         'spell': talent['spell']['id'],
                         'name': talent['spell']['name'],
                         'icon': talent['spell']['icon']}

                if 'spec' not in talent:
                    talents['a'].append(new_t)
                    talents['Z'].append(new_t)
                    talents['b'].append(new_t)
                elif talent['spec'] == 'Assassination':
                    talents['a'].append(new_t)
                elif talent['spec'] == 'Outlaw':
                    talents['Z'].append(new_t)
                elif talent['spec'] == 'Subtlety':
                    talents['b'].append(new_t)

    return talents

def test_talents():
    talents = get('us')
    print(talents)

if __name__ == '__main__':

    test_talents()
