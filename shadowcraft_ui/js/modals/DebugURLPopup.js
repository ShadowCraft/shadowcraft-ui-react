import React from 'react';
import ModalWrapper from './ModalWrapper';

export default class DebugURLPopup extends React.Component
{
    render()
    {
        let url = `http://shadowcraft.mmo-mumble.com/${this.props.region}/${this.props.realm}/${this.props.name}/${this.props.sha}`
        
        return (
            <ModalWrapper style={{ top: "355px", left: "440px", width: "650px" }} modalId="debugURL">
                <h1>Debug URL</h1>
                <form id="debugURL">
                    Copy the link below:<br/>
                    <input type="text" value={url} readOnly style={{width: "100%", marginBottom: "10px"}} /><br/>
                    <input className="ui-button ui-widget ui-state-default ui-corner-all" role="button" value="Close" onClick={this.props.hideModal} />
                </form>
                <a className="close-popup ui-dialog-titlebar-close ui-corner-all" role="button" onClick={this.props.hideModal}>
                    <span className="ui-icon ui-icon-closethick" />
                </a>
            </ModalWrapper>
        );
    }
}
