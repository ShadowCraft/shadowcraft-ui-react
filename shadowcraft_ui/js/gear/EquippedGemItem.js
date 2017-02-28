import React from 'react';

export default class EquippedGemItem extends React.Component {
    render() {
        return (
            <div className="gem tt " key={this.props.key}>
                <span className="socket">
                    {/*TODO: properly handle colored sockets*/}
                    <img src="/static/images/icons/Socket_Prismatic.png" /> </span>
                <span className="img">
                    <img src={`http://media.blizzard.com/wow/icons/56/${this.props.gem.icon}.jpg`} />
                </span>
                < span className="gem_name" > {this.props.gem.name}</span >
            </div >
        );
    }
}