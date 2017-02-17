import React from 'react'

function Ranking(props) {
    return (
        <div className="talent_contribute" id={"talent-weight-"+props.slug}>
            <div className="name">{props.name}</div>
            <div className="pct">
                <div className="label">{props.label}</div>
                <div className="pct-inner" style={{ width: props.pct }}></div>
            </div>
        </div>
    )
};

export default class RankingSection extends React.Component {
    render() {
        return (
            <section id={this.props.data.id}>
                <h3>{this.props.data.name}</h3>
                <div className="inner">
                    {this.props.data.sections.map(function(section) {
                        return (
                            <div key={section.index} className={section.className}>
                            {section.name && <h3>{section.name}</h3> }
                                {section.items.map(function(item) {
                                    return (
                                        <Ranking key={item.slug} slug={item.slug} name={item.name} label={item.label} pct={item.pct} />
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
            </section>
        )
    }
};
