import React from 'react'

export default React.createClass({
    render: function () {
        const divStyle = { margin: 0, padding: 0, display: 'inline' }
        return (
            <div className='characters-new'>
                <div id='create_character'>
                    <form acceptCharset="UTF-8" action="" className="new_character" id="new_character" method="post">
                        <div style={divStyle}>
                            <input name="utf8" type="hidden" value="&#x2713;" />
                            <input name="authenticity_token" type="hidden" value="3MTYlJElBy5jj+uKDD/BpXi5BU8u4PPZwDaOzPMzS3s=" />
                        </div>
                        <span>
                            <label htmlFor='character_name'>Character Name</label>
                            <input id="character_name" name="character[name]" size="30" type="text" />
                        </span>
                        <span>
                            <label htmlFor='character_realm'>Realm</label>
                            <input id="character_realm" name="character[realm]" size="30" type="text" />
                        </span>
                        <span>
                            <label htmlFor='character_region'>Region</label>
                            <div className='regions'>
                                <label>
                                    <input id="character_region_us" name="character[region]" type="radio" value="US" />  US</label>
                                <label>
                                    <input id="character_region_eu" name="character[region]" type="radio" value="EU" /> EU</label>
                                <label>
                                    <input id="character_region_kr" name="character[region]" type="radio" value="KR" /> KR</label>
                                <label>
                                    <input id="character_region_tw" name="character[region]" type="radio" value="TW" /> TW</label>
                                <label>
                                    <input id="character_region_cn" name="character[region]" type="radio" value="CN" /> CN</label>
                                <level>
                                    <input id="character_region_sea" name="character[region]" type="radio" value="SEA" /> SEA</level>
                            </div>
                        </span>
                        <div className='submit'>
                            <input name="commit" type="submit" value="Begin" />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
})