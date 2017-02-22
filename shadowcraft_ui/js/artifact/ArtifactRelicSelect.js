import React from "react"

export default class ArtifactRelicSelect extends React.Component {
    
    constructor(props)
    {
        super(props)
        this.handleRelicChange = this.handleRelicChange.bind(this)
        this.handleIlvlChange = this.handleIlvlChange.bind(this)
        this.selected_trait = this.props.selected.trait
        this.selected_ilvl = this.props.selected.ilvl
    }
1
    handleRelicChange(e) {
        e.preventDefault()
        this.selected_trait = parseInt(e.target.value)
        this.props.parent.change_relic(this.props.index, this.selected_trait, this.selected_ilvl)
    }

    handleIlvlChange(e) {
        e.preventDefault()
        this.selected_ilvl = parseInt(e.target.value)
        this.props.parent.change_relic(this.props.index, this.selected_trait, this.selected_ilvl)
    }

    render()
    {
        var relics = this.props.relics.map(function(relic) {
            return <option key={relic[0]} id={"relic-"+relic[0]+"-select"} value={relic[0]}>{relic[1]}</option>
        })

        var ilvls = []
        for (var i = 835; i <= 955; i++) {
            ilvls.push(<option key={i} id={"relicilvl-"+this.props.index+"-"+i}>{i}</option>)
        }
        
        return (
            <label className="select">
                <span className="label">Relic {parseInt(this.props.index)+1} ({this.props.type}):</span>
                <span className="select-container">
                <select className="optionSelect" id={"relic-"+this.props.index+"-select"} data-index={this.props.index} onChange={this.handleRelicChange} value={this.props.selected.trait}>
                        <option id={"relic-"+this.props.index+"-none"} value="0">None</option>
                        {relics}
                    </select>
                </span>
                <span className="select-container">
                <select className="optionSelect" id={"relic-"+this.props.index+"-select"} data-index={this.props.index} onChange={this.handleIlvlChange} value={this.props.selected.ilvl}>
                        {ilvls}
                    </select>
                </span>
            </label>
        )
    }
}
