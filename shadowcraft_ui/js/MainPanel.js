import React from 'react';

export default class MainPanel extends React.Component{

    render(){
        return (
            <div>
                <h1 style={{textAlign: 'right'}}>Shadowcraft</h1>
                <Pagination />
            </div>
        )
    }
}