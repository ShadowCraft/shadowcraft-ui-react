import React from "react"
import ArtifactTrait from './ArtifactTraitDiv'

var FRAME_WIDTH=720.0
var FRAME_HEIGHT=615.0

export default class ArtifactFrame extends React.Component {
    render() {
        var traits = [];
        var lines = [];
        for (var idx in this.props.layout.traits) {
            var trait = this.props.layout.traits[idx]

            // The position that we grab from wowhead is translated to match the center
            // of where the div is. This makes calculating the lines below easier.
            // Translate it back to where the corner of the div actually should be.
            var left = (trait.x-45) / FRAME_WIDTH * 100.0
            var top = (trait.y-45) / FRAME_HEIGHT * 100.0
            
            traits.push(<ArtifactTrait id={idx} tooltip_id={trait.id} left={left+"%"} top={top+"%"} max_rank={trait.max_rank} icon={trait.icon} ring={trait.ring} cur_rank="0" />)
        }

        for (var line of this.props.layout.lines) {
            var trait1 = this.props.layout.traits[line.trait1]
            var trait2 = this.props.layout.traits[line.trait2]
            var x1 = trait1.x / FRAME_WIDTH * 100.0
            var y1 = trait1.y / FRAME_HEIGHT * 100.0
            var x2 = trait2.x / FRAME_WIDTH * 100.0
            var y2 = trait2.y / FRAME_HEIGHT * 100.0
            lines.push(<line x1={x1+"%"} y1={y1+"%"} x2={x2+"%"} y2={y2+"%"} strokeWidth="6" stroke="yellow"/>)
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
