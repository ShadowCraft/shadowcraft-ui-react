import React from 'react'

export default class EquippedGems extends React.Component {

    render() {
        let gemItems = this.props.gems.map(gem => {
            //TODO: handle rendering for empty sockets
            // I think it would be good to have empty but valid socket be 0...
            // and the number of objects in gems indicate the number of valid sockets
            if (gem !== 0) {
                return (
                    <div className="gem tt " data-tooltip-id={gem.id}>
                        <span className="socket">
                            {/*TODO: not handling colored sockets*/}
                            <img src="/static/images/icons/Socket_Prismatic.png" /> </span>
                        <span className="img">
                            {/*TODO: need to map gemid to icon*/}
                            <img src={gem.image} />
                        </span>
                        < span className="gem_name" > {gem.name} gem name goes here</span >
                    </div >
                )
            }
        })

        // console.log(this.props.gems)
        return (
            <div className="gems">
                {gemItems}
            </div>

        )
    }
}