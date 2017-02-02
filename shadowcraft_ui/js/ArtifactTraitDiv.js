import React from "react"

export default class ArtifactTrait extends React.Component {
    render() {
        return (
            <div className="trait tt" id={this.props.id} data-tooltip-id={this.props.tooltip_id} data-tooltip-type="spell" data-max-rank={this.props.max_rank} style={{left: this.props.left, top: this.props.top}}>
                <img className="relic inactive" src="static/images/artifacts/relic-blood.png" />
                <img className="icon" src={"http://wow.zamimg.com/images/wow/icons/large/"+this.props.icon+".jpg"} />
                <img className="ring" src={"static/images/artifacts/ring-"+this.props.ring+".png"} />
                <span className="level">{this.props.cur_rank}/{this.props.max_rank}</span>
            </div>
        )
    }
}
