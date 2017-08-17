import React from 'react';
import ModalWrapper from './ModalWrapper';

export default class ReloadSwirlPopup extends React.Component
{
    render()
    {
        const style = { top: "355px", left: "440px", minWidth: "60px", width: "60px",
                        height: "60px", background: "rgb(0, 0, 0)" };

        return (
            <ModalWrapper style={style} modalId="reloadSwirl">
                <img src="/static/images/wait.gif" />
            </ModalWrapper>
        );
    }
}
