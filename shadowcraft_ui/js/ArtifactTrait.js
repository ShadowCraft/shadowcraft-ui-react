import React from "react"

export default class ArtifactTrait extends React.Component {
    render() {
        return (
            <svg id={props.id} data-tooltip-id={props.tooltip_id} data-tooltip-type="spell" className="trait tt" x={props.left} y={props.top} data-max-rank={props.max_rank} width="90" height="90">
                <clipPath id="iconclip">
                    <circle r="22" cx="45" cy="45"/>
                </clipPath>
                <image className="relic inactive" href={"/static/images/artifacts/relic-blood.png"} width="90" height="90"/>
                <image className="icon" href={"http://wow.zamimg.com/images/wow/icons/large/"+props.icon+".jpg"} clipPath="url(#iconclip)" x="22" y="22" height="46" width="46"/>
                <image href={"/static/images/artifacts/ring-"+props.ring+".png"} x="5" y="5"/>
                <text className="level">{props.cur_rank}/{props.max_rank}</text>
            </svg>
        )
    }
}
