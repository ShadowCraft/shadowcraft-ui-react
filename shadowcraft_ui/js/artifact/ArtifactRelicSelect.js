import React from "react"

export default class ArtifactRelicSelect extends React.Component {
    
    constructor(props)
    {
        super(props)
        this.handleRelicChange = this.handleRelicChange.bind(this)
        this.handleIlvlChange = this.handleIlvlChange.bind(this)
    }

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
        console.log(this.props.index)

        this.selected_trait = this.props.selected.trait
        this.selected_ilvl = this.props.selected.ilvl
        
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
                {console.log(this.props.selected.id)}
                    <select className="optionSelect" id={"relic-"+this.props.index+"-select"} data-index={this.props.index} value={this.props.selected.id} onChange={this.handleRelicChange}>
                        <option id={"relic-"+this.props.index+"-none"} value="0">None</option>
                        {relics}
                    </select>
                </span>
                <span className="select-container">
                    <select className="optionSelect" id={"relic-"+this.props.index+"-select"} data-index={this.props.index} value={this.props.selected.ilvl} onChange={this.handleIlvlChange}>
                        {ilvls}
                    </select>
                </span>
            </label>
        )
    }
}
