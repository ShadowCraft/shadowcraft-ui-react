import React from 'react';

export default class EquippedGemItem extends React.Component {
    constructor() {
        super();
        this.state = { hovered: false };
        this.imgspan = {
            background: 'url(/static/images/empty.png)',
            width: '13px',
            height: '13px',
            marginRight: '12px',
            overflow: 'hidden',
            position: 'relative',
            border: '1px solid #333333',
            verticalAlign: 'middle',
            display: 'inline-block'
        };
    }

    // TODO: this isn't the only place we style with hover, so this will need to the generalize and fix the error'

    toggleHover() {
        this.setState({ hovered: !this.state.hovered });
    }

    gemStyle() {
        return {
            position: 'relative',
            backgroundColor: this.state.hovered ? 'rgba(0, 128, 255, 0.15)' : '#0e0e0e',
            backgroundImage: 'url(/static/images/texture.png)',
            marginBottom: '2px',
            borderRadius: '2px',
            padding: '5px',
            fontSize: '0.9em',
            minHeight: '14px',
            transition: 'background 0.2s',
            // &:hover,
            // &.active',
            // backgroundColor: 'rgba(0, 128, 255, 0.15)'
        };
    }

    // comments here indicate what classes were inlined until the process is finished
    render() {
        return (
            // className="gem tt"
            <div
                style={this.gemStyle()}
                key={this.props.key}
                onMouseEnter={this.toggleHover.bind(this)}
                onMouseLeave={this.toggleHover.bind(this)}
            >
                {/*className="socket"*/}
                <span style={{ position: 'absolute', top: '9px', left: '13px' }}>
                    {/*TODO: properly handle colored sockets*/}
                    <img src="/static/images/icons/Socket_Prismatic.png" /> </span>
                <span style={this.imgspan}>
                    {/*className="img"*/}
                    <img
                        style={{ width: '17px', marginLeft: '-2px', marginTop: '-2px' }}
                        src={`http://media.blizzard.com/wow/icons/56/${this.props.gem.icon}.jpg`}
                    />
                </span>
                {/*className="gem_name"*/}
                <span >{this.props.gem.name}</span>
            </div >
        );
    }
}