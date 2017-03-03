import React from 'react';
import GearPane from './gear/GearPane';
import TalentPane from './TalentPane';
import ArtifactPane from './artifact/ArtifactPane';
import AdvancedPane from './advanced/AdvancedPane';
import DocsPane from './DocsPane';
import RightPane from './RightPane';

var Tabs = require('react-simpletabs-alt');

export default class CharacterPane extends React.Component {
    // hold on to your butts

    constructor(props) {
        super(props);

        // have bind this because otherwise you get handleArtifactChange's this
        // #javascriptproblems
        this.handleArtifactChange = this.handleArtifactChange.bind(this);
        this.handleTalentChange = this.handleTalentChange.bind(this);

        this.state = this.props.data;
        this.state.current_talents = this.props.data.talents[this.props.data.active];
    }

    handleArtifactChange(traits, relics) {
        var state = this.state;

        if (relics != null) {
            state.artifact.relics = relics;
        }

        if (traits != null) {
            state.artifact.traits = traits;
        }

        this.setState(state);
    }

    handleTalentChange(spec, talents) {
        this.setState({ active: spec, current_talents: talents });
    }

    render() {

        // mocking data
        let spec = 'Assassination'; //not actually being passed right, funnily enough
        let settings = [
            {
                spec: 'Assassination',
                heading: 'Assassination Rotation Settings',
                items: [
                    {
                        label: 'Kingsbane w/ Vendetta',
                        description: '',
                        type: 'dropdown',
                        active: "Use cooldown if it aligns, but don't delay usage",
                        options: [
                            "Use cooldown if it aligns, but don't delay usage",
                            'Only use cooldown with Vendetta',
                        ]
                    },
                    {
                        label: 'Exsang w/ Vendetta',
                        description: '',
                        type: 'dropdown',
                        active: "Use cooldown if it aligns, but don't delay usage",
                        options: [
                            "Use cooldown if it aligns, but don't delay usage",
                            'Only use cooldown with Vendetta',
                        ]
                    },
                    {
                        label: 'CP Builder',
                        description: '',
                        type: 'dropdown',
                        active: 'Mutilate',
                        options: [
                            "Mutilate",
                            'Fan of Knives',
                        ]
                    },
                    {
                        label: 'Lethal Poison',
                        description: '',
                        type: 'dropdown',
                        active: "Use cooldown if it aligns, but don't delay usage",
                        options: [
                            "Deadly Poison",
                            'Wound Poison',
                        ]
                    },
                ]

            },
            {
                spec: 'Outlaw',
                heading: 'Outlaw Rotation Settings',
                items: [
                    {
                        label: 'Blade Flurry',
                        description: 'Use Blade Flurry',
                        type: 'checkbox',
                        checked: false
                    },
                    {
                        label: 'BtE Policy',
                        description: '',
                        type: 'dropdown',
                        active: "Never use BtE",
                        options: [
                            "Only use with Shark",
                            'Use BtE on cooldown',
                            'Never use BtE'
                        ]
                    },
                    {
                        label: 'RtB Reroll Policy',
                        description: '',
                        type: 'dropdown',
                        active: "Reroll single buffs",
                        options: [
                            'Reroll single buffs',
                            'Reroll two or fewer buffs',
                            'Reroll three or fewer buffs',
                            'Custom setup per buff (see below)'
                        ]
                    },
                    {
                        label: 'Jolly Roger',
                        description: '0 means never reroll combos with this buff. 1 means reroll singles of this buff. 2 means reroll double-buff rolls containing this buff. 3 means reroll triple-buff rolls containing this buff.',
                        type: 'dropdown',
                        active: 0,
                        options: [
                            0,
                            1,
                            2,
                            3
                        ]
                    },
                    {
                        label: 'Grand Melee',
                        description: '0 means never reroll combos with this buff. 1 means reroll singles of this buff. 2 means reroll double-buff rolls containing this buff. 3 means reroll triple-buff rolls containing this buff.',
                        type: 'dropdown',
                        active: 0,
                        options: [
                            0,
                            1,
                            2,
                            3
                        ]
                    },
                    {
                        label: 'Shark-Infested Waters',
                        description: '0 means never reroll combos with this buff. 1 means reroll singles of this buff. 2 means reroll double-buff rolls containing this buff. 3 means reroll triple-buff rolls containing this buff.',
                        type: 'dropdown',
                        active: 0,
                        options: [
                            0,
                            1,
                            2,
                            3
                        ]
                    },
                    {
                        label: 'True Bearing',
                        description: '0 means never reroll combos with this buff. 1 means reroll singles of this buff. 2 means reroll double-buff rolls containing this buff. 3 means reroll triple-buff rolls containing this buff.',
                        type: 'dropdown',
                        active: 0,
                        options: [
                            0,
                            1,
                            2,
                            3
                        ]
                    },
                    {
                        label: 'Buried Treasure',
                        description: '0 means never reroll combos with this buff. 1 means reroll singles of this buff. 2 means reroll double-buff rolls containing this buff. 3 means reroll triple-buff rolls containing this buff.',
                        type: 'dropdown',
                        active: 0,
                        options: [
                            0,
                            1,
                            2,
                            3
                        ]
                    },
                    {
                        label: 'Broadsides',
                        description: '0 means never reroll combos with this buff. 1 means reroll singles of this buff. 2 means reroll double-buff rolls containing this buff. 3 means reroll triple-buff rolls containing this buff.',
                        type: 'dropdown',
                        active: 0,
                        options: [
                            0,
                            1,
                            2,
                            3
                        ]
                    }
                ]

            },
            {
                spec: 'Subtlety',
                heading: 'Subtlety Rotation Settings',
                items: [
                    {
                        label: 'CP Builder',
                        description: '',
                        type: 'dropdown',
                        active: 'Backstab',
                        options: [
                            'Backstab',
                            'Shuriken Storm'
                        ]
                    },
                    {
                        label: 'SoD Policy',
                        description: '',
                        type: 'dropdown',
                        active: 'Use on cooldown',
                        options: [
                            'Use on cooldown',
                            'Only use SoD when needed to refresh'
                        ]
                    },
                    {
                        label: 'Use Finishers during Dance',
                        description: '',
                        type: 'checkbox',
                        checked: false
                    },
                    {
                        label: 'Backstab uptime',
                        description: 'Percentage of the fight you are behind the target (0-100). This has no effect if Gloomblade is selected as a talent.',
                        type: 'textbox',
                    },
                    {
                        label: 'Compute CP Waste',
                        description: 'EXPERIMENTAL FEATURE: Compute combo point waste',
                        type: 'checkbox',
                        checked: false
                    }
                ]

            },
            {
                spec: 'All',
                heading: 'Raid Buffs',
                items: [
                    {
                        label: 'Legion Agility Flask',
                        description: 'Flask of the Seventh Demon (1300 Agility)',
                        type: 'checkbox',
                        checked: false
                    },
                    {
                        label: '+30% Haste/40 sec',
                        description: 'Heroism/Bloodlust/Time Warp',
                        type: 'checkbox',
                        checked: false
                    },
                    {
                        label: 'Food',
                        description: '',
                        type: 'dropdown',
                        active: 'The Hungry Magister (375 Crit)',
                        options: [
                            'The Hungry Magister (375 Crit)',
                            'Azshari Salad (375 Haste)',
                            'Nightborne Delicacy Platter (375 Mastery)',
                            'Seed-Battered Fish Plate (375 Versatility)',
                            'Lavish Suramar Feast (200 Agility)',
                            'Fishbrul Special (High Fire Proc)'
                        ]
                    },

                    {
                        label: 'Pre-pot',
                        description: '',
                        type: 'dropdown',
                        active: 'Potion of the Old War',
                        options: [
                            'Potion of the Old War',
                            'Potion of Deadly Grace',
                            'None'
                        ]
                    },

                    {
                        label: 'Combat Potion',
                        description: '',
                        type: 'dropdown',
                        active: 'Potion of the Old War',
                        options: [
                            'Potion of the Old War',
                            'Potion of Deadly Grace',
                            'None'
                        ]
                    }
                ]
            },
            {
                spec: 'All',
                heading: 'General Settings',
                items: [
                    {
                        label: 'Enemy is Demon',
                        description: 'Enables damage buff from heirloom trinket against demons',
                        type: 'checkbox',
                        checked: false
                    },
                    {
                        label: 'Patch/Engine',
                        description: '',
                        type: 'dropdown',
                        active: 'Potion of the Old War',
                        options: [
                            '7.0',
                            'fierys strange voodoo'
                        ]
                    },
                    {
                        label: 'Race',
                        description: '',
                        type: 'dropdown',
                        active: 'Human',
                        options: [
                            'Human',
                            'Dwarf',
                            'Orc',
                            'Blood Elf',
                            'Gnome',
                            'Worgen',
                            'Troll',
                            'Night Elf',
                            'Undead',
                            'Goblin',
                            'Pandaren'

                        ]
                    },
                    {
                        label: 'Night Elf Racial',
                        description: '',
                        type: 'dropdown',
                        active: 'Night',
                        options: [
                            'Night',
                            'Day'
                        ]
                    },
                    {
                        label: 'Finisher Threshold',
                        description: 'Minimum CPs to use finisher',
                        type: 'dropdown',
                        active: 5,
                        options: [
                            4,
                            5,
                            6
                        ]
                    },
                    {
                        label: 'Level',
                        description: '',
                        type: 'textbox',
                    },
                    {
                        label: 'Fight Duration',
                        description: '',
                        type: 'textbox',
                    },
                    {
                        label: 'Response Time',
                        description: '',
                        type: 'textbox',
                    },
                    {
                        label: 'Number of Boss Adds',
                        description: '',
                        type: 'textbox',
                    },
                    {
                        label: 'MfD Resets Per Minute',
                        description: '',
                        type: 'textbox',
                    }
                ]
            },
            {
                spec: 'All',
                heading: 'Item Filter',
                items: [
                    {
                        label: 'Dynamic ILevel filtering',
                        description: 'Dynamically filters items in gear lists to +/- 50 Ilevels of the item equipped in that slot. Disable this option to use the manual filtering options below.',
                        type: 'checkbox',
                        checked: false
                    },
                    {
                        label: 'Max ILevel',
                        description: "Don't show items over this item level in gear lists",
                        type: 'textbox',
                    },
                    {
                        label: 'Min ILevel',
                        description: "Don't show items under this item level in gear lists",
                        type: 'textbox',
                    },

                    {
                        label: 'Show Upgrades',
                        description: 'Show all upgraded items in gear lists',
                        type: 'dropdown',
                        active: 'No',
                        options: [
                            'Yes',
                            'No'
                        ]
                    },

                    {
                        label: 'Recommend Epic Gems',
                        description: '',
                        type: 'dropdown',
                        active: 'No',
                        options: [
                            'Yes',
                            'No'
                        ]
                    }]

            },
            {
                spec: 'All',
                heading: 'Other',
                items: [

                    {
                        label: 'Latency',
                        description: '',
                        type: 'textbox',
                    },
                    {
                        label: 'Advanced Parameters',
                        description: '',
                        type: 'textbox',
                    }
                ]

            }
        ];
        let abilityRanking = {
            breakdown: [
                {
                    name: 'Serrate',
                    dps: 123124,
                    pct: .15
                },
                {
                    name: 'Stab',
                    dps: 325643,
                    pct: .25
                }, {
                    name: 'Slit',
                    dps: 123124,
                    pct: .5
                },
                {
                    name: 'Shiv',
                    dps: 325643,
                    pct: .30
                },
                {
                    name: 'Slice',
                    dps: 123124,
                    pct: .10
                },
                {
                    name: 'Slash',
                    dps: 325643,
                    pct: .20
                }
            ],
            build: {
                ui: 'thisfake',
                engine: 'commitid'
            }
        };

        // console.log(this.props.data)
        return (
            <div>
                <div style={{ marginBottom: '25px', display: 'flex' }}>
                    <div id="container" style={{ flex: 4 }}>
                        <div id="curtain">
                            <div id='tabs'>
                                <Tabs>
                                    <Tabs.Panel title="Gear">
                                        <GearPane data={this.props.data} />
                                    </Tabs.Panel>
                                    <Tabs.Panel title="Talents">
                                        <TalentPane data={this.state} onChange={this.handleTalentChange} />
                                    </Tabs.Panel>
                                    <Tabs.Panel title="Artifact">
                                        <ArtifactPane data={this.state} onChange={this.handleArtifactChange} />
                                    </Tabs.Panel>
                                    <Tabs.Panel title="Advanced">
                                        <AdvancedPane data={abilityRanking} spec={spec} settings={settings} />
                                    </Tabs.Panel>
                                    <Tabs.Panel title="Documentation">
                                        <DocsPane />
                                    </Tabs.Panel>
                                </Tabs>
                            </div>
                        </div>
                    </div >
                    <RightPane data={this.props.data} />
                </div>

                <div id="wait" style={{ display: 'none' }}>
                    <div id="waitMsg" />
                </div>
                <div id="modal" style={{ display: 'none' }} />
                <div id="footer">
                    <div className='padding'>
                        Questions to <a href="mailto:shadowcraft@ravenholdt.net">Ravenholdt</a> &bull; UI source at <a href="http://github.com/cheald/shadowcraft-ui">GitHub</a>      &bull; discussion at <a href="https://discord.gg/DdPahJ9">Ravenholdt</a> &bull; DPS/EP engine source at <a href="https://github.com/Fierydemise/ShadowCraft-Engine">GitHub</a>      &bull; Hosting provided by <a href="http://mmo-mumble.com">MMO-Mumble.com</a>
                    </div>
                </div>
            </div >
        );
    }
}
