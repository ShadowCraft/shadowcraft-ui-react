import React from "react";

export default class DocsPane extends React.Component {
    render() {
        return (
            <div id="docs" className="ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide">
                <h3>7.3 Release</h3>
                <h4>UI Status:</h4>
                <ul>
                    <li>Completely rewrote the whole thing in React/Python, throwing away all of the years of legacy Coffeescript/Ruby code that made changes difficult.</li>
                </ul>
                
            </div>
        );
    }
}
