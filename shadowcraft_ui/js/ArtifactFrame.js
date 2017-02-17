import React from "react"
import ArtifactTrait from './ArtifactTraitDiv'

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
            traits: {}
        }

        for (var idx in this.props.layout.traits) {
            var trait = this.props.layout.traits[idx]
            var trait_id = trait.id
            this.state.traits[trait_id] = {
                cur_rank: 0,
                max_rank: trait.max_rank,
                enabled_by: []
            }
        }

        this.state.traits[this.props.layout.primary_trait].cur_rank = 1
        this.state.traits[this.props.layout.primary_trait].enabled_by.push('primary')
        for (var id of this.connected_traits[this.props.layout.primary_trait])
        {
            var current_enablers = this.state.traits[id].enabled_by
            current_enablers.push(this.props.layout.primary_trait)
            this.state.traits[id].enabled_by = current_enablers
        }
    }

    attach_relic(trait_id, rank_increase)
    {
        var new_max = this.state.traits[trait_id].max_rank + rank_increase
        var new_current = this.state.traits[trait_id].cur_rank + rank_increase
        
        var traits = this.state.traits
        traits[trait_id].max_rank = this.state.traits[trait_id].max_rank + rank_increase
        traits[trait_id].cur_rank = this.state.traits[trait_id].cur_rank + rank_increase
        this.setState({traits: traits})
    }

    detach_relic(trait_id, rank_increase)
    {
        var traits = this.state.traits
        traits[trait_id].max_rank = this.state.traits[trait_id].max_rank - rank_increase
        traits[trait_id].cur_rank = this.state.traits[trait_id].cur_rank - rank_increase
        this.setState({traits: traits})
    }

    increase_rank(trait_id)
    {
        if (this.state.traits[trait_id].enabled_by.length > 0 &&
            this.state.traits[trait_id].cur_rank < this.state.traits[trait_id].max_rank) {
            var traits = this.state.traits
            traits[trait_id].cur_rank = this.state.traits[trait_id].cur_rank + 1
            this.setState({traits: traits})

            if (traits[trait_id].cur_rank == traits[trait_id].max_rank) {
                for (var id of this.connected_traits[trait_id]) {
                    this.enable_connection(id, trait_id)
                }
            }
        }
    }
    
    decrease_rank(trait_id)
    {
        if (this.state.traits[trait_id].enabled_by.length == 0) {
            return
        }
        
        if (this.state.traits[trait_id].cur_rank == this.state.traits[trait_id].max_rank) {
            for (var id of this.connected_traits[trait_id]) {
                this.disable_connection(id, trait_id)
            }
        }
        
        if (this.state.traits[trait_id].cur_rank > 0) {
            var traits = this.state.traits
            traits[trait_id].cur_rank = this.state.traits[trait_id].cur_rank - 1
            this.setState({traits: traits})
        }
    }

    enable_connection(trait_id, by)
    {
        var traits = this.state.traits
        traits[trait_id].enabled_by.push(by)
        this.setState({traits: traits})
    }

    disable_connection(trait_id, by)
    {
        console.log("disabling " + trait_id + " " + by)
        var traits = this.state.traits
        var index = traits[trait_id].enabled_by.indexOf(by)
        if (index > -1) {
            traits[trait_id].enabled_by.splice(index, 1)

            var empty = (traits[trait_id].enabled_by.length == 0)
            if (empty) {
                traits[trait_id].cur_rank = 0
            }

            this.setState({traits: traits})

            if (empty) {
                for (var id of this.connected_traits[trait_id]) {
                    this.disable_connection(id, trait_id)
                }
            }
        }
    }

    render()
    {
        var trait_elements = [];
        var line_elements = [];
        for (var idx in this.props.layout.traits) {
            var trait = this.props.layout.traits[idx]

            // The position that we grab from wowhead is translated to match the center
            // of where the div is. This makes calculating the lines below easier.
            // Translate it back to where the corner of the div actually should be.
            var left = (trait.x-45) / FRAME_WIDTH * 100.0
            var top = (trait.y-45) / FRAME_HEIGHT * 100.0

            var trait_state = this.state.traits[trait.id]
            var enabled = trait_state.enabled_by.length > 0 || trait_state.cur_rank > 0

            trait_elements.push(<ArtifactTrait key={idx} id={idx} tooltip_id={trait.id} left={left+"%"} top={top+"%"} cur_rank={trait_state.cur_rank} max_rank={trait_state.max_rank} icon={trait.icon} ring={trait.ring} enabled={enabled} parent={this} />)
        }

        for (var line of this.props.layout.lines) {
            var trait1 = this.props.layout.traits[line.trait1]
            var trait2 = this.props.layout.traits[line.trait2]
            var x1 = trait1.x / FRAME_WIDTH * 100.0
            var y1 = trait1.y / FRAME_HEIGHT * 100.0
            var x2 = trait2.x / FRAME_WIDTH * 100.0
            var y2 = trait2.y / FRAME_HEIGHT * 100.0
            
            line_elements.push(<line key={trait1.id.toString()+"-"+trait2.id.toString()} x1={x1+"%"} y1={y1+"%"} x2={x2+"%"} y2={y2+"%"} strokeWidth="6"
                                    stroke={((this.state.traits[trait1.id].cur_rank == this.state.traits[trait1.id].max_rank) || (this.state.traits[trait2.id].cur_rank == this.state.traits[trait2.id].max_rank)) ? "yellow" : "grey"}/>)
        }
        return (
            <div id="artifactframe" style={{ backgroundImage: 'url(/static/images/artifacts/'+this.props.layout.artifact+'-bg.jpg)' }}>
                {trait_elements}
                <svg width={FRAME_WIDTH} height={FRAME_HEIGHT} viewBox={"0 0 "+FRAME_WIDTH+" "+FRAME_HEIGHT}>
                    {line_elements}
                </svg>
            </div>
        )
    }
}
