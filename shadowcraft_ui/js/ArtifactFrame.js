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
        this.setState({traits: {trait_id: {max_rank: new_max,
                                           cur_rank: new_current}}})
    }

    detach_relic(trait_id, rank_increase)
    {
        var new_max = this.state.traits[trait_id].max_rank - rank_increase
        var new_current = this.state.traits[trait_id].cur_rank - rank_increase
        this.setState({traits: {trait_id: {max_rank: new_max,
                                           cur_rank: new_current}}})
    }

    increase_rank(trait_id)
    {
        if (this.state.traits[trait_id].cur_rank < this.state.traits[trait_id].max_rank) {
            var rank = this.state.traits[trait_id].cur_rank + 1
            this.setState({traits: {trait_id: {cur_rank: rank}}})

            if (rank == this.state.traits[trait_id].max_rank) {
                for (id in this.connected_traits[trait_id]) {
                    enable_connection(id, trait_id)
                }
            }
        }
    }
    
    decrease_rank(trait_id)
    {
        if (this.state.traits[traid_id].cur_rank == this.state.traits[trait_id].max_rank) {
            for (id in this.connected_traits[trait_id]) {
                disable_connection(id, trait_id)
            }
        }
        
        if (this.state.traits[trait_id].cur_rank > 0) {
            var rank = this.state.traits[trait_id].cur_rank - 1
            this.setState({traits: {trait_id: {cur_rank: rank}}})
        }
    }

    enable_connection(trait_id, by)
    {
        var current_enablers = this.state.traits[trait_id].enabled_by
        current_enablers.push(by)
        this.setState({traits: {trait_id: {enabled_by: current_enablers}}})
    }

    disable_connection(trait_id, by)
    {
        var current_enablers = this.state.traits[trait_id].enabled_by
        var index = current_enablers.indexOf(by)
        if (index > -1) {
            current_enablers.splice(index, 1)
        }

        this.setState({traits: {trait_id: {enabled_by: current_enablers}}})
    }

    render() {
        var traits = [];
        var lines = [];
        for (var idx in this.props.layout.traits) {
            var trait = this.props.layout.traits[idx]
            var trait_state = this.state.traits[trait.id]

            // The position that we grab from wowhead is translated to match the center
            // of where the div is. This makes calculating the lines below easier.
            // Translate it back to where the corner of the div actually should be.
            var left = (trait.x-45) / FRAME_WIDTH * 100.0
            var top = (trait.y-45) / FRAME_HEIGHT * 100.0

            traits.push(<ArtifactTrait id={idx} tooltip_id={trait.id} left={left+"%"} top={top+"%"} max_rank={trait_state.max_rank} icon={trait.icon} ring={trait.ring} cur_rank={trait_state.cur_rank} enabled={trait_state.enabled_by.length > 0}  parent={this} />)
        }

        for (var line of this.props.layout.lines) {
            var trait1 = this.props.layout.traits[line.trait1]
            var trait2 = this.props.layout.traits[line.trait2]
            var x1 = trait1.x / FRAME_WIDTH * 100.0
            var y1 = trait1.y / FRAME_HEIGHT * 100.0
            var x2 = trait2.x / FRAME_WIDTH * 100.0
            var y2 = trait2.y / FRAME_HEIGHT * 100.0
            var color = "yellow"

            lines.push(<line x1={x1+"%"} y1={y1+"%"} x2={x2+"%"} y2={y2+"%"} strokeWidth="6"
                        stroke={((this.state.traits[trait1.id].cur_rank == this.state.traits[trait1.id].max_rank) || (this.state.traits[trait1.id].cur_rank == this.state.traits[trait1.id].max_rank)) ? "yellow" : "grey"}/>)
        }

        return (
            <div id="artifactframe" style={{ backgroundImage: 'url(/static/images/artifacts/'+this.props.layout.artifact+'-bg.jpg)' }}>
                {traits}
                <svg width={FRAME_WIDTH} height={FRAME_HEIGHT} viewBox={"0 0 "+FRAME_WIDTH+" "+FRAME_HEIGHT}>
                    {lines}
                </svg>
            </div>
        )
    }
}
