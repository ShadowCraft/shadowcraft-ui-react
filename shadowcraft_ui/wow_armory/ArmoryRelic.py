import re
import json
import requests
from .ArmoryDocument import ArmoryError

def get(relic_id):
    # Default values. These will be mostly garbage if the parsing fails.
    result = {'id': relic_id}

    headers = {'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36'}

    resp = requests.get('http://www.wowhead.com/item=%s' % relic_id, headers=headers, timeout=7)
    if resp.status_code != 200:
        print('Failed to retrieve data from wowhead for relic %d' % relic_id)
        raise ArmoryError('Failed to retrieve data from wowhead for relic %d' % relic_id)

    match = re.search(r'_\[%d\]={"name_enus":"(?P<name>.*?)","quality":(?P<quality>.*?),"icon":"(?P<icon>.*?)"' % relic_id, resp.text)
    result.update(match.groupdict())
    result['quality'] = int(result['quality'])

    tt_match = re.search(r'_\[%d\]\.tooltip_enus = \'(.*)\';' % relic_id, resp.text)
    if tt_match:
        match = re.search(r'#E6CC80">(.*?) Artifact Relic', tt_match.group(1))
        result['type'] = match.group(1)

        match = re.search(r'(\d*?) Item Levels', tt_match.group(0))
        result['ilvl_increase'] = int(match.group(1))

    # Each relic contains a list of the traits that it can modify, even if they're not
    # valid (see below). Why wowhead does this, I have no idea, but grab all of them,
    # convert the stupid escaped-xml-in-json-in-html shit to something useful, and pull
    # out just the rogue bits that we actually care about.
    types_data = re.search(r'_\[%d\]\.affectsArtifactPowerTypesData = (.*);' % relic_id, resp.text)
    spec_start = re.search(r'traitspecstart:(\d+)', resp.text)
    typesjson = json.loads(types_data.groups(1)[0])[spec_start.groups(1)[0]]

    # A relic can modify more than one trait at a time. Wowhead lists the specs that
    # have a trait related to this relic in their "validMenuSpecs" block. We only care
    # for specs 259(assn), 260(outlaw), and 261(sub).
    match = re.search(r'_\[%d\]\.validMenuSpecs = \[(.*)\];' % relic_id, resp.text)
    traits = match.group(1).split(',')

    result['traits'] = {}
    spec_mappings = {'a':'259', 'Z':'260', 'b':'261'}
    for spec, spec_id in spec_mappings.items():
        if spec_id in traits:
            match = re.search(r'\+(\d+) Rank.*\/spell=(\d+).*?>(.*?)<', typesjson[spec_id])
            result['traits'][spec] = {'rank': int(match.group(1)),
                                      'spell': int(match.group(2)),
                                      'name': match.group(3)}

    return result

def test_relics():
    print(get(142512))

if __name__ == '__main__':
    test_relics()
