import React from "react"
import ArtifactTrait from './ArtifactTraitDiv'
import ArtifactRelicSelect from './ArtifactRelicSelect'

var FRAME_WIDTH=720.0
var FRAME_HEIGHT=615.0

export default class ArtifactFrame extends React.Component {

    constructor(props)
    {
        super(props)

        this.connected_traits = {}
        for (var line of this.props.layout.lines) {
            var trait1 = this.props.layout.traits[line.trait1].id
            var trait2 = this.props.layout.traits[line.trait2].id

            if (!(trait1 in this.connected_traits)) {
                this.connected_traits[trait1] = []
            }
            if (!(trait2 in this.connected_traits)) {
                this.connected_traits[trait2] = []
            }

            this.connected_traits[trait1].push(trait2)
            this.connected_traits[trait2].push(trait1)
        }

        this.state = {
            total_traits: 1,
            traits: {},
            relics: []
        }

        this.relics = []
        for (var idx in this.props.layout.traits) {
            var trait = this.props.layout.traits[idx]
            var trait_id = trait.id
            this.state.traits[trait_id] = {
                cur_rank: 0,
                max_rank: trait.max_rank,
                enabled: false
            }

            if (trait.relic) {
                this.relics.push([trait.id, trait.name])
            }
        }

        this.relics.sort(function(a,b) {
            if (a[1] == b[1]) {
                return 0
            } else if (a[1] < b[1]) {
                return -1
            } else {
                return 1
            }
        })

        this.state.traits[this.props.layout.primary_trait].cur_rank = 1
        this.state.traits[this.props.layout.primary_trait].enabled = true

        this.state.relics.push({trait: (this.relics[0] && this.relics[0][0]) || 0, ilvl: 830})
        this.state.relics.push({trait: (this.relics[0] && this.relics[0][0]) || 0, ilvl: 830})
        this.state.relics.push({trait: (this.relics[0] && this.relics[0][0]) || 0, ilvl: 830})

        this.update_state(this.state.traits, this.state.relics, true)
    }

    attach_relic(trait_id, rank_increase)
    {
        var new_max = this.state.traits[trait_id].max_rank + rank_increase
        var new_current = this.state.traits[trait_id].cur_rank + rank_increase

        var traits = this.state.traits
        traits[trait_id].max_rank = this.state.traits[trait_id].max_rank + rank_increase
        traits[trait_id].cur_rank = this.state.traits[trait_id].cur_rank + rank_increase
        this.update_state(traits, this.state.relics, false)
    }

    detach_relic(trait_id, rank_increase)
    {
        var traits = this.state.traits
        traits[trait_id].max_rank = this.state.traits[trait_id].max_rank - rank_increase
        traits[trait_id].cur_rank = this.state.traits[trait_id].cur_rank - rank_increase
        this.update_state(traits, this.state.relics, false)
    }

    increase_rank(trait_id)
    {
        if (this.state.traits[trait_id].enabled &&
            this.state.traits[trait_id].cur_rank < this.state.traits[trait_id].max_rank)
        {
            var traits = this.state.traits
            traits[trait_id].cur_rank = this.state.traits[trait_id].cur_rank + 1
            this.update_state(traits, this.state.relics, false)
        }
    }

    decrease_rank(trait_id)
    {
        // TODO: this needs to check for relics too
        if (this.state.traits[trait_id].enabled) {
            var traits = this.state.traits
            traits[trait_id].cur_rank = this.state.traits[trait_id].cur_rank - 1
            this.update_state(traits, this.state.relics, false)
        }
    }

    change_relic(slot, trait, ilvl)
    {
        var cur_state = this.state.relics
        this.state.relics[parseInt(slot)].trait = trait
        this.state.relics[parseInt(slot)].ilvl = ilvl
        this.update_state(this.state.traits, cur_state, false)
    }

    update_state(new_traits, new_relics, from_constructor)
    {
        // starting at the top of the tree, walk down it to find all of the traits that should
        // actually be enabled.
        var traits_to_check = [this.props.layout.primary_trait]
        var traits_checked = []
        var total_traits = 0

        while (traits_to_check.length > 0)
        {
            var trait = traits_to_check.shift()
            if (traits_checked.indexOf(trait) != -1) {
                continue
            }

            traits_checked.push(trait)
            new_traits[trait].enabled = true;
            if (new_traits[trait].cur_rank == new_traits[trait].max_rank) {
                traits_to_check = traits_to_check.concat(this.connected_traits[trait])
            }
        }

        // Disable everything else, unless there's a relic attached to it
        // TODO: the relic bits
        for (var trait in new_traits)
        {
            var t = parseInt(trait)
            if (traits_checked.indexOf(parseInt(t)) == -1)
            {
                new_traits[t].cur_rank = 0
                new_traits[t].enabled = false
            }
            else
            {
                total_traits += new_traits[t].cur_rank
            }
        }

        if (!from_constructor) {
            this.setState({total_traits: total_traits, traits: new_traits, relics: new_relics})
        }
    }

    render()
    {
        var trait_elements = [];
        var line_elements = [];

        for (var idx in this.props.layout.traits) {
            var trait = this.props.layout.traits[idx]
            var trait_state = this.state.traits[trait.id]

            // The position that we grab from wowhead is translated to match the center
            // of where the div is. This makes calculating the lines below easier.
            // Translate it back to where the corner of the div actually should be.
            var left = (trait.x-45) / FRAME_WIDTH * 100.0
            var top = (trait.y-45) / FRAME_HEIGHT * 100.0

            trait_elements.push(<ArtifactTrait key={idx} id={idx} tooltip_id={trait.id} left={left+"%"} top={top+"%"} cur_rank={trait_state.cur_rank} max_rank={trait_state.max_rank} icon={trait.icon} ring={trait.ring} enabled={trait_state.enabled} parent={this} />)
        }

        for (var line of this.props.layout.lines) {
            var trait1 = this.props.layout.traits[line.trait1]
            var trait2 = this.props.layout.traits[line.trait2]
            var x1 = trait1.x / FRAME_WIDTH * 100.0
            var y1 = trait1.y / FRAME_HEIGHT * 100.0
            var x2 = trait2.x / FRAME_WIDTH * 100.0
            var y2 = trait2.y / FRAME_HEIGHT * 100.0

            var color = this.state.traits[trait1.id].enabled && this.state.traits[trait2.id].enabled ? "yellow" : "grey"

            line_elements.push(<line key={trait1.id.toString()+"-"+trait2.id.toString()} x1={x1+"%"} y1={y1+"%"} x2={x2+"%"} y2={y2+"%"} strokeWidth="6" stroke={color} />)
        }

        return (
            <div className="panel-content">
                <div id="artifactactive">
                    <span className="spec-icon" style={{ backgroundImage: 'url(http://wow.zamimg.com/images/wow/icons/medium/'+this.props.layout.artifact_icon+'.jpg)' }}></span>
                <span className="spec-name">{this.props.layout.artifact_name}</span>
                    <span className="power-spent" style={{ float: 'right' }}>Trait Points Spent: {this.state.total_traits}</span>
                </div>

                <div id="artifactframe" style={{ backgroundImage: 'url(/static/images/artifacts/'+this.props.layout.artifact+'-bg.jpg)' }}>
                    {trait_elements}
                    <svg width={FRAME_WIDTH} height={FRAME_HEIGHT} viewBox={"0 0 "+FRAME_WIDTH+" "+FRAME_HEIGHT}>
                        {line_elements}
                    </svg>
                </div>

                <br/>
                <ArtifactRelicSelect index="0" relics={this.relics} selected={this.state.relics[0]} type={this.props.layout.relics[0]} parent={this}/>
                <br/>
                <ArtifactRelicSelect index="1" relics={this.relics} selected={this.state.relics[1]} type={this.props.layout.relics[1]} parent={this} />
                <br/>
                <ArtifactRelicSelect index="2" relics={this.relics} selected={this.state.relics[2]} type={this.props.layout.relics[2]} parent={this} />
            </div>
        )
    }
}
