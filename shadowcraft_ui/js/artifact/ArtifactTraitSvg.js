import React from "react"

// unused / experimental component

export default class ArtifactTrait extends React.Component {
    render() {
        return (
            <svg className="trait tt" id={this.props.id} data-tooltip-id={this.props.tooltip_id} data-tooltip-type="spell" data-max-rank={this.props.max_rank} x={this.props.left} y={this.props.top} width="90" height="90">
                <clipPath id="iconclip">
                    <circle r="22" cx="45" cy="45"/>
                </clipPath>
                <image className="relic inactive" href={"/static/images/artifacts/relic-blood.png"} width="90" height="90"/>
                <image className="icon" href={"http://wow.zamimg.com/images/wow/icons/large/"+this.props.icon+".jpg"} clipPath="url(#iconclip)" x="22" y="22" height="46" width="46"/>
                <image href={"/static/images/artifacts/ring-"+this.props.ring+".png"} x="5" y="5"/>
                <text className="level">{this.props.cur_rank}/{this.props.max_rank}</text>
            </svg>
        )
    }
}
