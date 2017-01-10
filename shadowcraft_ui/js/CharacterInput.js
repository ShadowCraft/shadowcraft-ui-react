import React from 'react'

export default React.createClass({
    render: function () {
        const divStyle = { margin: 0, padding: 0, display: 'inline' }
        return (
                <div id='container' className='characters-new'>
                    <div id='create_character'>
                        <div className='form'>
                            <div className='browser-support'>
                                <p className='requires-js'>Shadowcraft requires Javascript to run. Please turn it on and disable NoScript.</p>
                                <p>Shadowcraft runs best with a modern browser with full HTML5 support.</p>
                                <p className='browser-list'>For best results, use:</p>
                                <div className='browsers'>
                                    <a href='http://www.google.com/chrome/intl/en/landing_chrome.html'>
                                        <img alt="Chrome" src="../static/images/browser/chrome.png" />
                                        <span>Google Chrome</span>
                                        <em>Best</em>
                                    </a>
                                    <a href='http://www.apple.com/safari/'>
                                        <img alt="Safari" src="../static/images/browser/safari.png" />
                                        <span>Apple Safari</span>
                                        <em>Best</em>
                                    </a>
                                    <a href='http://www.mozilla.com/en-US/firefox/RC/'>
                                        <img alt="Firefox" src="../static/images/browser/firefox.png" />
                                        <span>Mozilla Firefox</span>
                                        <em>Good</em>
                                    </a>
                                    <a href='http://www.beautyoftheweb.com'>
                                        <img alt="Ie" src="../static/images/browser/ie.png" />
                                        <span>Internet Explorer</span>
                                        <em>Good</em>
                                    </a>
                                </div>
                            </div>
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
                </div>
        )
    }
})