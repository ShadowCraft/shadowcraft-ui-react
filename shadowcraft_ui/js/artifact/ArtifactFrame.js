import React from 'react';
import ArtifactTrait from './ArtifactTrait';
import ArtifactRelicSelect from './ArtifactRelicSelect';

var FRAME_WIDTH=720.0;
var FRAME_HEIGHT=615.0;

export default class ArtifactFrame extends React.Component {

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
            this.props.data.artifact.traits[trait_id] < this.trait_state.traits[trait_id].max_rank)
        {
            var data = this.props.data.artifact;
            data.traits[trait_id] += 1;
            this.update_state(data, true);
        }
    }

    decrease_rank(trait_id)
    {
        var data = this.props.data.artifact;
        if (this.trait_state.traits[trait_id].enabled && data.traits[trait_id] != 0) {
            data.traits[trait_id] -= 1;
            this.update_state(data, true);
        }
    }

    change_relic(slot, trait, ilvl)
    {
        var cur_state = this.props.data.artifact.relics;
        cur_state[parseInt(slot)].trait = trait;
        cur_state[parseInt(slot)].ilvl = ilvl;
        this.props.onChange(null, cur_state);
    }

    update_state(artifact_data, send_state)
    {
        // starting at the top of the tree, walk down it to find all of the traits that should
        // actually be enabled.
        var traits_to_check = [this.props.layout.primary_trait];
        var traits_checked = [];
        var trait;

        this.trait_state.total_traits = 0;

        while (traits_to_check.length > 0)
        {
            trait = traits_to_check.shift();
            if (traits_checked.indexOf(trait) != -1) {
                continue;
            }

            traits_checked.push(trait);
            this.trait_state.traits[trait].enabled = true;
            if ((trait == this.props.layout.primary_trait) || (artifact_data.traits[trait] == this.trait_state.traits[trait].max_rank)) {
                traits_to_check = traits_to_check.concat(this.connected_traits[trait]);
            }
        }

        // Disable everything else, unless there's a relic attached to it
        for (trait in this.trait_state.traits)
        {
            var t_state = this.trait_state.traits[trait]
            this.trait_state.traits[trait].max_rank = this.trait_state.traits[trait].default_max_rank;
            
            if (traits_checked.indexOf(parseInt(trait)) == -1) {
                this.trait_state.traits[trait].enabled = false;
                artifact_data.traits[trait] = 0;
            }
            else if (artifact_data.traits[trait]) {
                this.trait_state.total_traits += artifact_data.traits[trait];
            }
        }

        console.log(this.trait_state.total_traits)

        // Fix the max ranks for traits that have relics attached
        for (var relic in artifact_data.relics)
        {
            var relic_trait = artifact_data.relics[relic].id;
            console.log(artifact_data.relics[relic]);
            console.log(relic_trait);

            if (relic_trait != 0) {
                this.trait_state.traits[relic_trait].max_rank += 1;
                this.trait_state.traits[relic_trait].enabled = true;
                this.trait_state.total_traits -= 1;

                if (traits_checked.indexOf(parseInt(relic_trait)) == -1) {
                    artifact_data.traits[relic_trait] += 1;
                }
            }
        }

        if (send_state) {
            this.props.onChange(artifact_data.traits, null);
        }
    }

    render()
    {
        var trait_elements = [];
        var line_elements = [];

        this.update_state(this.props.data.artifact, false);

        for (var idx in this.props.layout.traits) {
            var trait = this.props.layout.traits[idx];
            var trait_rank = this.props.data.artifact.traits[trait.id];
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

            var color = this.trait_state.traits[trait1.id].enabled && this.trait_state.traits[trait2.id].enabled ? 'yellow' : 'grey';

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
                <ArtifactRelicSelect index="0" relics={this.relics} selected={this.props.data.artifact.relics[0]} type={this.props.layout.relics[0]} parent={this}/>
                <br/>
                <ArtifactRelicSelect index="1" relics={this.relics} selected={this.props.data.artifact.relics[1]} type={this.props.layout.relics[1]} parent={this} />
                <br/>
                <ArtifactRelicSelect index="2" relics={this.relics} selected={this.props.data.artifact.relics[2]} type={this.props.layout.relics[2]} parent={this} />
            </div>
        );
    }
}
