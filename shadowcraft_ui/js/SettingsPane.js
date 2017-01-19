import React from "react"

export default class TalentPane extends React.Component {
    render() {
        return (
            <div id="settings" className="ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide">
                <section className="cluster combat" style={{ display: 'none' }}>
                    <div className="option-list">
                        <h3>Combat Rotation Settings</h3>
                        <div className="settings">
                            <label className="select" htmlFor="opt-rotation-blade_flurry">
                                <span className="label">Blade Flurry</span>
                                <input className="optionCheck" data-ns="rotation" id="opt-rotation-blade_flurry" name="blade_flurry" type="checkbox" value="false" />
                                <span className="desc">Use Blade Flurry</span>
                            </label>

                            <label className="select">
                                <span className="label">BtE Policy</span>
                                <span className="select-container">
                                    <select className="optionSelect" name="between_the_eyes_policy" id="opt-rotation-between_the_eyes_policy" data-ns="rotation">
                                        <option value="shark">Only use with Shark</option>
                                        <option value="always">Use BtE on cooldown</option>
                                        <option value="never">Never use BtE</option>
                                    </select>
                                </span>
                                <span className="desc"></span>
                            </label>
                            <label className="select">
                                <span className="label">RtB Reroll Policy</span>
                                <span className="select-container">
                                    <select className="optionSelect" name="reroll_policy" id="opt-rotation-reroll_policy" data-ns="rotation">
                                        <option value="1">Reroll single buffs</option>
                                        <option value="2">Reroll two or fewer buffs</option>
                                        <option value="3">Reroll three or fewer buffs</option>
                                        <option value="custom">Custom setup per buff (see below)</option>
                                    </select>
                                </span>
                                <span className="desc"></span>
                            </label>
                            <label className="select">
                                <span className="label">Jolly Roger</span>
                                <span className="select-container">
                                    <select className="optionSelect" name="jolly_roger_reroll" id="opt-rotation-jolly_roger_reroll" data-ns="rotation">
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </select>
                                </span>
                                <span className="desc">0 means never reroll combos with this buff. 1 means reroll singles of this buff. 2 means reroll double-buff rolls containing this buff. 3 means reroll triple-buff rolls containing this buff.</span>
                            </label>
                            <label className="select">
                                <span className="label">Grand Melee</span>
                                <span className="select-container">
                                    <select className="optionSelect" name="grand_melee_reroll" id="opt-rotation-grand_melee_reroll" data-ns="rotation">
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </select>
                                </span>
                                <span className="desc"></span>
                            </label>
                            <label className="select">
                                <span className="label">Shark-Infested Waters</span>
                                <span className="select-container">
                                    <select className="optionSelect" name="shark_reroll" id="opt-rotation-shark_reroll" data-ns="rotation">
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </select>
                                </span>
                                <span className="desc"></span>
                            </label>
                            <label className="select">
                                <span className="label">True Bearing</span>
                                <span className="select-container">
                                    <select className="optionSelect" name="true_bearing_reroll" id="opt-rotation-true_bearing_reroll" data-ns="rotation">
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </select>
                                </span>
                                <span className="desc"></span>
                            </label>
                            <label className="select">
                                <span className="label">Buried Treasure</span>
                                <span className="select-container">
                                    <select className="optionSelect" name="buried_treasure_reroll" id="opt-rotation-buried_treasure_reroll" data-ns="rotation">
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </select>
                                </span>
                                <span className="desc"></span>
                            </label>
                            <label className="select">
                                <span className="label">Broadsides</span>
                                <span className="select-container">
                                    <select className="optionSelect" name="broadsides_reroll" id="opt-rotation-broadsides_reroll" data-ns="rotation">
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </select>
                                </span>
                                <span className="desc"></span>
                            </label>
                        </div>
                    </div>
                </section>
                <section className="cluster mutilate" style={{ display: 'block' }}>
                    <div className="option-list">
                        <h3>Assassination Rotation Settings</h3>
                        <div className="settings">
                            <label className="select">
                                <span className="label">Kingsbane w/ Vendetta</span>
                                <span className="select-container">
                                    <select className="optionSelect" name="kingsbane" id="opt-rotation-kingsbane" data-ns="rotation">
                                        <option value="just">Use cooldown if it aligns, but don't delay usage</option>
                                        <option value="only">Only use cooldown with Vendetta</option>
                                    </select>
                                </span>
                                <span className="desc"></span>
                            </label>
                            <label className="select">
                                <span className="label">Exsang w/ Vendetta</span>
                                <span className="select-container">
                                    <select className="optionSelect" name="exsang" id="opt-rotation-exsang" data-ns="rotation">
                                        <option value="just">Use cooldown if it aligns, but don't delay usage</option>
                                        <option value="only">Only use cooldown with Vendetta</option>
                                    </select>
                                </span>
                                <span className="desc"></span>
                            </label> <label className="select">
                                <span className="label">CP Builder</span>
                                <span className="select-container">
                                    <select className="optionSelect" name="assn_cp_builder" id="opt-rotation-assn_cp_builder" data-ns="rotation">
                                        <option value="mutilate">Mutilate</option>
                                        <option value="fan_of_knives">Fan of Knives</option>
                                    </select>
                                </span>
                                <span className="desc"></span>
                            </label>
                            <label className="select">
                                <span className="label">Lethal Poison</span>
                                <span className="select-container">
                                    <select className="optionSelect" name="lethal_poison" id="opt-rotation-lethal_poison" data-ns="rotation">
                                        <option value="dp">Deadly Poison</option>
                                        <option value="wp">Wound Poison</option>
                                        <option value="ap">Agonizing Poison</option>
                                    </select>
                                </span>
                                <span className="desc"></span>
                            </label>
                        </div>
                    </div>
                </section>
                <section className="cluster subtlety" style={{ display: 'none' }}>
                    <div className="option-list">
                        <h3>Subtlety Rotation Settings</h3>
                        <div className="settings">
                            <label className="select">
                                <span className="label">CP Builder</span>
                                <span className="select-container">
                                    <select className="optionSelect" name="sub_cp_builder" id="opt-rotation-sub_cp_builder" data-ns="rotation">
                                        <option value="backstab">Backstab</option>
                                        <option value="shuriken_storm">Shuriken Storm</option>
                                    </select>
                                </span>
                                <span className="desc"></span>
                            </label> <label className="select">
                                <span className="label">SoD Policy</span>
                                <span className="select-container">
                                    <select className="optionSelect" name="symbols_policy" id="opt-rotation-symbols_policy" data-ns="rotation">
                                        <option value="always">Use on cooldown</option>
                                        <option value="just">Only use SoD when needed to refresh</option>
                                    </select>
                                </span>
                                <span className="desc"></span>
                            </label>
                            <label className="select" htmlFor="opt-rotation-dance_finishers_allowed">
                                <span className="label">Use Finishers during Dance</span>
                                <input className="optionCheck" data-ns="rotation" id="opt-rotation-dance_finishers_allowed" name="dance_finishers_allowed" type="checkbox" checked="checked" value="true" />
                                <span className="desc"></span>
                            </label>
                            <label className="input">
                                <span className="label">Backstab uptime</span>
                                <input className="optionInput" data-ns="rotation" id="opt-rotation-positional_uptime" name="positional_uptime" type="text" />
                                <span className="desc">Percentage of the fight you are behind the target (0-100). This has no effect if Gloomblade is selected as a talent.</span>
                            </label> <label className="select" htmlFor="opt-rotation-compute_cp_waste">
                                <span className="label">Compute CP Waste</span>
                                <input className="optionCheck" data-ns="rotation" id="opt-rotation-compute_cp_waste" name="compute_cp_waste" type="checkbox" checked="checked" value="true" />
                                <span className="desc">EXPERIMENTAL FEATURE: Compute combo point waste</span>
                            </label>
                        </div>
                    </div>
                </section>
                <section className="cluster">
                    <div className="option-list">
                        <h3>Raid Buffs</h3>
                        <div id="playerBuffs"><label className="select">
                            <span className="label">Food Buff</span> <span className="select-container">
                                <select className="optionSelect" name="food_buff" id="opt-buffs-food_buff" data-ns="buffs">
                                    <option value="food_legion_375_crit">The Hungry Magister (375 Crit)</option>
                                    <option value="food_legion_375_haste">Azshari Salad (375 Haste)</option>
                                    <option value="food_legion_375_mastery">Nightborne Delicacy Platter (375 Mastery)</option>
                                    <option value="food_legion_375_versatility">Seed-Battered Fish Plate (375 Versatility)</option>
                                    <option value="food_legion_feast_200">Lavish Suramar Feast (200 Agility)</option>
                                    <option value="food_legion_damage_3">Fishbrul Special (High Fire Proc)</option>
                                </select>
                            </span>
                            <span className="desc"></span>
                        </label>
                            <label className="select" htmlFor="opt-buffs-flask_legion_agi">
                                <span className="label">Legion Agility Flask</span>
                                <input className="optionCheck" data-ns="buffs" id="opt-buffs-flask_legion_agi" name="flask_legion_agi" type="checkbox" value="false" />
                                <span className="desc">Flask of the Seventh Demon (1300 Agility)</span>
                            </label> <label className="select" htmlFor="opt-buffs-short_term_haste_buff">
                                <span className="label">+30% Haste/40 sec</span>
                                <input className="optionCheck" data-ns="buffs" id="opt-buffs-short_term_haste_buff" name="short_term_haste_buff" type="checkbox" checked="checked" value="true" />
                                <span className="desc">Heroism/Bloodlust/Time Warp</span>
                            </label>
                        </div>
                    </div>
                    <div className="option-list">
                        <h3>Other</h3>
                        <div id="raidOther">
                            <label className="select">
                                <span className="label">Pre-pot</span>
                                <span className="select-container">
                                    <select className="optionSelect" name="prepot" id="opt-general-prepot" data-ns="general">
                                        <option value="potion_old_war">Potion of the Old War</option>
                                        <option value="potion_deadly_grace">Potion of Deadly Grace</option>
                                        <option value="potion_none">None</option>
                                    </select>
                                </span>
                                <span className="desc"></span>
                            </label>
                            <label className="select">
                                <span className="label">Combat Potion</span>
                                <span className="select-container">
                                    <select className="optionSelect" name="potion" id="opt-general-potion" data-ns="general">
                                        <option value="potion_old_war">Potion of the Old War</option>
                                        <option value="potion_deadly_grace">Potion of Deadly Grace</option>
                                        <option value="potion_none">None</option>
                                    </select>
                                </span>
                                <span className="desc"></span>
                            </label>
                        </div>
                    </div>
                </section>
                <section className="cluster">
                    <div className="option-list">
                        <h3>General Settings</h3>
                        <div id="general">
                            <label className="select">
                                <span className="label">Patch/Engine</span>
                                <span className="select-container">
                                    <select className="optionSelect" name="patch" id="opt-general-patch" data-ns="general">
                                        <option value="70">7.0</option>
                                    </select>
                                </span>
                                <span className="desc"></span>
                            </label>
                            <label className="input">
                                <span className="label">Level</span>
                                <input className="optionInput" data-ns="general" id="opt-general-level" name="level" type="text" />
                                <span className="desc"></span>
                            </label>
                            <label className="select">
                                <span className="label">Race</span>
                                <span className="select-container">
                                    <select className="optionSelect" name="race" id="opt-general-race" data-ns="general">
                                        <option value="Human">Human</option>
                                        <option value="Dwarf">Dwarf</option>
                                        <option value="Orc">Orc</option>
                                        <option value="Blood Elf">Blood Elf</option>
                                        <option value="Gnome">Gnome</option>
                                        <option value="Worgen">Worgen</option>
                                        <option value="Troll">Troll</option>
                                        <option value="Night Elf">Night Elf</option>
                                        <option value="Undead">Undead</option>
                                        <option value="Goblin">Goblin</option>
                                        <option value="Pandaren">Pandaren</option>
                                    </select>
                                </span>
                                <span className="desc"></span>
                            </label>
                            <label className="select">
                                <span className="label">Racial (Night Elf)</span>
                                <span className="select-container">
                                    <select className="optionSelect" name="night_elf_racial" id="opt-general-night_elf_racial" data-ns="general">
                                        <option value="0">Night (1% Haste)</option>
                                        <option value="1">Day (1% Crit)</option>
                                    </select>
                                </span>
                                <span className="desc"></span>
                            </label>
                            <label className="input">
                                <span className="label">Fight Duration</span>
                                <input className="optionInput" data-ns="general" id="opt-general-duration" name="duration" type="text" />
                                <span className="desc"></span>
                            </label>
                            <label className="input">
                                <span className="label">Response Time</span>
                                <input className="optionInput" data-ns="general" id="opt-general-response_time" name="response_time" type="text" />
                                <span className="desc"></span>
                            </label>
                            <label className="input">
                                <span className="label">Number of Boss Adds</span>
                                <input className="optionInput" data-ns="general" id="opt-general-num_boss_adds" name="num_boss_adds" type="text" />
                                <span className="desc"></span>
                            </label>
                            <label className="select" htmlFor="opt-general-demon_enemy">
                                <span className="label">Enemy is Demon</span>
                                <input className="optionCheck" data-ns="general" id="opt-general-demon_enemy" name="demon_enemy" type="checkbox" checked="checked" value="0" />
                                <span className="desc">Enables damage buff from heirloom trinket against demons</span>
                            </label>
                            <label className="input">
                                <span className="label">MfD Resets Per Minute</span>
                                <input className="optionInput" data-ns="general" id="opt-general-mfd_resets" name="mfd_resets" type="text" />
                                <span className="desc"></span>
                            </label>
                            <label className="select">
                                <span className="label">Finisher Threshold</span>
                                <span className="select-container">
                                    <select className="optionSelect" name="finisher_threshold" id="opt-general-finisher_threshold" data-ns="general">
                                        <option value="6">6</option>
                                        <option value="5">5</option>
                                        <option value="4">4</option>
                                    </select>
                                </span>
                                <span className="desc">Minimum CPs to use finisher</span>
                            </label>
                        </div>
                    </div>
                    <div className="option-list">
                        <h3>Item Filter</h3>
                        <div id="generalFilter">
                            <label className="select" htmlFor="opt-general-dynamic_ilvl">
                                <span className="label">Dynamic ILevel filtering</span>
                                <input className="optionCheck" data-ns="general" id="opt-general-dynamic_ilvl" name="dynamic_ilvl" type="checkbox" checked="checked" value="true" />
                                <span className="desc">Dynamically filters items in gear lists to +/- 50 Ilevels of the item equipped in that slot. Disable this option to use the manual filtering options below.</span>
                            </label>
                            <label className="input">
                                <span className="label">Max ILevel</span>
                                <input className="optionInput" data-ns="general" id="opt-general-max_ilvl" name="max_ilvl" type="text" />
                                <span className="desc">Don't show items over this item level in gear lists</span>
                            </label>
                            <label className="input">
                                <span className="label">Min ILevel</span>
                                <input className="optionInput" data-ns="general" id="opt-general-min_ilvl" name="min_ilvl" type="text" />
                                <span className="desc">Don't show items under this item level in gear lists</span>
                            </label>
                            <label className="select">
                                <span className="label">Show Upgrades</span>
                                <span className="select-container">
                                    <select className="optionSelect" name="show_upgrades" id="opt-general-show_upgrades" data-ns="general">
                                        <option value="0">No</option>
                                        <option value="1">Yes</option>
                                    </select>
                                </span>
                                <span className="desc">Show all upgraded items in gear lists</span>
                            </label>
                            <label className="select">
                                <span className="label">Recommend Epic Gems</span>
                                <span className="select-container">
                                    <select className="optionSelect" name="epic_gems" id="opt-general-epic_gems" data-ns="general">
                                        <option value="0">No</option>
                                        <option value="1">Yes</option>
                                    </select>
                                </span>
                                <span className="desc"></span>
                            </label>
                        </div>
                    </div>
                    <div className="option-list">
                        <h3>Advanced Settings</h3>
                        <div id="advancedSettings">
                            <label className="input">
                                <span className="label">Latency</span>
                                <input className="optionInput" data-ns="advanced" id="opt-advanced-latency" name="latency" type="text" />
                                <span className="desc"></span>
                            </label>
                            <label className="input">
                                <span className="label">Advanced Parameters</span>
                                <input className="optionInput" data-ns="advanced" id="opt-advanced-adv_params" name="adv_params" type="text" />
                                <span className="desc"></span>
                            </label>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
