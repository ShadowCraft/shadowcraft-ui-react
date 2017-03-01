import React from 'react';

// leaving these classes together for now until the backend is plumbed
// can refactor after everything is in place

class BreakdownItem extends React.Component {
    render() {
        // console.log(this.props.item)
        return (
            <div title={`${this.props.item.dps} dps`} className="talent_contribution">
                <div className="name" >{this.props.item.name}</div>
                <div className="pct">
                    <div className="label">{this.props.item.pct * 100}%</div>
                    <div className="pct-inner" style={{ width: `${this.props.item.pct / this.props.maxpct * 100}%`}} />
                </div>
            </div>
        );
    }

}

class BreakdownList extends React.Component {

    getBreakdownItems(items) {
        // console.log(items)
        let mylist = items.sort((a, b) => b.pct > a.pct);
        return mylist.map((listitem) => <BreakdownItem key={listitem.name} item={listitem} maxpct={mylist[0].pct} />);
    }

    render() {
        return (
            <div className="inner" >
                {this.getBreakdownItems(this.props.list)}
            </div>
        );
    }
}

export default class AdvancedPane extends React.Component {

    render() {
        //console.log(this.props.data)
        return (
            <div className="with-tools ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide" id="advanced">
                <div className="panel-tools">
                    <section id="dpsbreakdown">
                        <h3>DPS Breakdown</h3>
                        <BreakdownList list={this.props.data.breakdown} />
                    </section>
                    <section id="engineinfo">
                        <h3>Version Info</h3>
                        <div className="inner">
                            <div className="stat"> <span className="key">UI </span> <span className="val">{this.props.data.build.ui}</span> </div>
                            <div className="stat"> <span className="key">Engine </span> <span className="val">{this.props.data.build.engine}</span> </div>
                        </div>
                    </section>
                </div>
                <div className="panel-content" />
            </div>
        );
    }
}