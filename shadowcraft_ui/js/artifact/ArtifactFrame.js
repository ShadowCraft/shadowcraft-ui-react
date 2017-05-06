import React from 'react';
import { connect } from 'react-redux';

import store from '../store';
import { updateCharacterState } from '../store';
import { recalculateStats, getArtifactIlvlChange } from '../common';
import ArtifactTrait from './ArtifactTrait';
import ArtifactRelicSelect from './ArtifactRelicSelect';

var FRAME_WIDTH=720.0;
var FRAME_HEIGHT=615.0;

class ArtifactFrame extends React.Component {

    constructor(props)
    {
        super(props);

        this.connected_traits = {};
        for (var line of this.props.layout.lines) {
            var trait1 = this.props.layout.traits[line.trait1].id;
            var trait2 = this.props.layout.traits[line.trait2].id;

            if (!(trait1 in this.connected_traits)) {
                this.connected_traits[trait1] = [];
            }
            if (!(trait2 in this.connected_traits)) {
                this.connected_traits[trait2] = [];
            }

            this.connected_traits[trait1].push(trait2);
            this.connected_traits[trait2].push(trait1);
        }

        this.trait_state = {
            total_traits: 1,
            traits: {}
        };

        this.relics = [];
        for (var idx in this.props.layout.traits) {
            var trait = this.props.layout.traits[idx];
            var trait_id = trait.id;
            this.trait_state.traits[trait_id] = {
                max_rank: trait.max_rank,
                default_max_rank: trait.max_rank,
                enabled: false
            };

            if (trait.relic) {
                this.relics.push([trait.id, trait.name]);
            }
        }

        this.relics.sort(function(a,b) {
            if (a[1] == b[1]) {
                return 0;
            } else if (a[1] < b[1]) {
                return -1;
            } else {
                return 1;
            }
        });
    }

    increase_rank(trait_id)
    {
        if (this.trait_state.traits[trait_id].enabled &&
            this.props.artifact.traits[trait_id] < this.trait_state.traits[trait_id].max_rank)
        {
            var data = this.props.artifact;
            data.traits[trait_id] += 1;
            this.update_state(data, true);
        }
    }

    decrease_rank(trait_id)
    {
        var data = this.props.artifact;
        if (this.trait_state.traits[trait_id].enabled && data.traits[trait_id] != 0) {
            data.traits[trait_id] -= 1;
            this.update_state(data, true);
        }
    }

    change_relic(slot, trait, ilvl)
    {
        // Recalculate the stats on the artifact based on the change in ilevel because of
        // the relic change.
        let ilvlChange = getArtifactIlvlChange(this.props.artifact.relics[slot].ilvl, ilvl);
        let stats = recalculateStats(this.props.gear['mainHand'].stats, ilvlChange);
        let weaponStats = recalculateStats(this.props.gear['mainHand'].weaponStats, ilvlChange);

        // TODO: this needs validation to make sure that the values are coming out correct
        store.dispatch(updateCharacterState(
            "UPDATE_ARTIFACT_RELIC", {slot: slot, trait: trait, ilvl: ilvl, stats: stats,
                                      weaponStats: weaponStats}));
    }

    update_state(artifact_data, send_state)
    {
        // starting at the top of the tree, walk down it to find all of the traits that should
        // actually be enabled.
        var traits_to_check = [this.props.layout.primary_trait];
        var traits_checked = [];
        var trait;

        // Force the primary trait to always be enabled. It always will be in-game, and it
        // doesn't get sent in the data from the armory. Setting it up here means that it will
        // get displayed correctly on the frame.
        artifact_data.traits[this.props.layout.primary_trait] = 1;

        // Get a quick count of the number of relics we have. We do more with relics later, but
        // need the count right now so the paragon trait doesn't get enabled too early.
        for (var relic in artifact_data.relics) {
            if (artifact_data.relics[relic].id != 0) {
                artifact_data.traits[artifact_data.relics[relic].id] -= 1;
            }
        }

        // Calculate how many traits are selected, minus the relic additions. This makes some
        // calculations easier later on, so we take the speed loss on looping through the
        // extra time. Don't include the main trait in the count. Seriously. Blizzard and Wowhead
        // both don't include it in their counts, I promise.
        this.trait_state.total_traits = Object.values(artifact_data.traits).reduce((a,b) => a+b);
        this.trait_state.total_traits -= 1;

        // Do some setup of the trait state. Disable all of the traits and set all of their
        // max ranks depending on the total count of traits.
        for (var t in this.trait_state.traits) {
            this.trait_state.traits[t].enabled = false;
            this.trait_state.traits[t].max_rank = this.trait_state.traits[t].default_max_rank;

            // If the paragon trait is enabled we need to bump all 3-point traits to be 4-point
            // traits. If the paragon trait isn't enabled, we need to make sure that all of the
            // now-3-point traits aren't greater than their max.
            if (artifact_data.traits[this.props.layout.paragon_trait] > 0 &&
                this.trait_state.traits[t].default_max_rank == 3)
            {
                this.trait_state.traits[t].max_rank += 1;
            } else if (artifact_data.traits[t] > this.trait_state.traits[t].max_rank)
            {
                artifact_data.traits[t] = this.trait_state.traits[t].max_rank;
            }
        }

        // Make sure that all of the traits that are dependent on certain trait counts get
        // added to the tree to check.
        if (this.trait_state.total_traits >= 34) {
            this.trait_state.traits[this.props.layout.paragon_trait].enabled = true;
        }
            
        if (this.props.layout.paragon_trait in artifact_data.traits &&
            artifact_data.traits[this.props.layout.paragon_trait] > 0) {
                traits_to_check.push(this.props.layout.second_major);
        }

        while (traits_to_check.length > 0)
        {
            trait = traits_to_check.shift();
            if (traits_checked.indexOf(trait) != -1) {
                continue;
            }

            traits_checked.push(trait);
            this.trait_state.traits[trait].enabled = true;

            // Add connected traits to the check list if one of the following:
            // 1. The trait is at max rank (always true for the first major trait)
            // 2. The trait is a 4-point trait, has at least 3 points in it, and the 35 point trait is active
            if (artifact_data.traits[trait] == this.trait_state.traits[trait].max_rank ||
                (this.props.layout.paragon_trait in artifact_data.traits &&
                 artifact_data.traits[this.props.layout.paragon_trait] > 0 &&
                 this.trait_state.traits[trait].max_rank == 4 &&
                 trait in artifact_data.traits && artifact_data.traits[trait] >= 3))

            {
                if (trait in this.connected_traits) {
                    traits_to_check = traits_to_check.concat(this.connected_traits[trait]);
                }
            }
        }

        // Loop back through. Anything that wasn't in the checked list gets reset to zero since it's not
        // connected to an active trait.
        for (trait in this.trait_state.traits)
        {
            if (trait != this.props.layout.paragon_trait &&
                traits_checked.indexOf(parseInt(trait)) == -1)
            {
                artifact_data.traits[trait] = 0;
            }
        }

        // Now that we've made all of the necessary changes to the state, re-run the counter
        // so that the display is correct. Do this before making modifications for the relics
        // so they're not included in the count.
        this.trait_state.total_traits = Object.values(artifact_data.traits).reduce((a,b) => a+b);
        this.trait_state.total_traits -= 1;

        // Fix the max ranks for traits that have relics attached
        for (var relic in artifact_data.relics)
        {
            var relic_trait = artifact_data.relics[relic].id;

            if (relic_trait != 0) {
                artifact_data.traits[artifact_data.relics[relic].id] += 1;
                this.trait_state.traits[relic_trait].max_rank += 1;
                this.trait_state.traits[relic_trait].enabled = true;
            }
        }

        if (send_state) {
            store.dispatch(updateCharacterState("UPDATE_ARTIFACT_TRAITS", artifact_data.traits));
        }
    }

    render()
    {
        var trait_elements = [];
        var line_elements = [];

        this.update_state(Object.assign({}, this.props.artifact), false);

        for (var idx in this.props.layout.traits) {
            var trait = this.props.layout.traits[idx];
            var trait_rank = this.props.artifact.traits[trait.id];
            var trait_state = this.trait_state.traits[trait.id];

            // The position that we grab from wowhead is translated to match the center
            // of where the div is. This makes calculating the lines below easier.
            // Translate it back to where the corner of the div actually should be.
            var left = (trait.x-45) / FRAME_WIDTH * 100.0;
            var top = (trait.y-45) / FRAME_HEIGHT * 100.0;

            trait_elements.push(<ArtifactTrait key={idx} id={idx} tooltip_id={trait.id} left={left+'%'} top={top+'%'} cur_rank={trait_rank} max_rank={trait_state.max_rank} icon={trait.icon} ring={trait.ring} enabled={trait_state.enabled} parent={this} />);
        }

        for (var line of this.props.layout.lines) {
            var trait1 = this.props.layout.traits[line.trait1];
            var trait2 = this.props.layout.traits[line.trait2];
            var x1 = trait1.x / FRAME_WIDTH * 100.0;
            var y1 = trait1.y / FRAME_HEIGHT * 100.0;
            var x2 = trait2.x / FRAME_WIDTH * 100.0;
            var y2 = trait2.y / FRAME_HEIGHT * 100.0;

            var tdata = this.props.artifact.traits;
            var tstate = this.trait_state.traits;

            var color = 'grey';
            if (tstate[trait1.id].enabled &&
                tstate[trait2.id].enabled &&
                (((tdata[trait1.id] == tstate[trait1.id].max_rank) || (tdata[trait1.id] == tstate[trait1.id].max_rank-1 && tdata[this.props.layout.paragon_trait] > 0)) ||
                 ((tdata[trait2.id] == tstate[trait2.id].max_rank) || (tdata[trait2.id] == tstate[trait2.id].max_rank-1 && tdata[this.props.layout.paragon_trait] > 0)))) {
                color = 'yellow';
            }

            line_elements.push(<line key={trait1.id.toString()+'-'+trait2.id.toString()} x1={x1+'%'} y1={y1+'%'} x2={x2+'%'} y2={y2+'%'} strokeWidth="6" stroke={color} />);
        }

        return (
            <div className="panel-content">
                <div id="artifactactive">
                    <span className="spec-icon" style={{ backgroundImage: 'url(http://wow.zamimg.com/images/wow/icons/medium/'+this.props.layout.artifact_icon+'.jpg)' }}></span>
                <span className="spec-name">{this.props.layout.artifact_name}</span>
                    <span className="power-spent" style={{ float: 'right' }}>Trait Points Spent: {this.trait_state.total_traits}</span>
                </div>

                <div id="artifactframe" style={{ backgroundImage: 'url(/static/images/artifacts/'+this.props.layout.artifact+'-bg.jpg)' }}>
                    {trait_elements}
                    <svg width={FRAME_WIDTH} height={FRAME_HEIGHT} viewBox={'0 0 '+FRAME_WIDTH+' '+FRAME_HEIGHT}>
                        {line_elements}
                    </svg>
                </div>

                <br/>
                <ArtifactRelicSelect index="0" relics={this.relics} selected={this.props.artifact.relics[0]} type={this.props.layout.relics[0]} parent={this}/>
                <br/>
                <ArtifactRelicSelect index="1" relics={this.relics} selected={this.props.artifact.relics[1]} type={this.props.layout.relics[1]} parent={this} />
                <br/>
                <ArtifactRelicSelect index="2" relics={this.relics} selected={this.props.artifact.relics[2]} type={this.props.layout.relics[2]} parent={this} />
            </div>
        );
    }
}

const mapStateToProps = function(store) {
    return {
        artifact: store.character.artifact,
        gear: store.character.gear
    };
};

export default connect(mapStateToProps)(ArtifactFrame);
