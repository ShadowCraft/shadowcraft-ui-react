import React from 'react'

export default class StatPanelElement extends React.Component {
    render() {
        return (
            <div className="stat"> <span className="key">{this.props.name}</span> <span className="val">{this.props.value}</span> </div>
        )
    }
}