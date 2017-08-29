import React from 'react';
import ModalWrapper from './ModalWrapper';

export default class ReloadSwirlPopup extends React.Component {
    render() {
        const style = {
            position: 'absolute',
            // ¯\_(ツ)_/¯ actually need to handle and event for resize, but whatevs
            top: `${(window.innerHeight * .5) - 34}px`,
            left: `${(window.innerWidth * .5) - 40}px`,
            minWidth: "60px",
            height: "60px",
            width: "60px",
            background: "rgb(0, 0, 0)"
        };

        return (
            <ModalWrapper style={style} modalId="reloadSwirl">
                <img src="/static/images/wait.gif" />
            </ModalWrapper>
        );
    }
}
