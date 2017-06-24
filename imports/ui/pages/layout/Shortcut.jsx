import React, { Component} from 'react'

import {Link} from 'react-router'

export default class Shortcut extends Component {

    render() {
        return (
            <div id="shortcut">
                <ul>
                    <li>
                        <Link to="/inbox" title="Inbox" className="jarvismetro-tile big-cubes bg-color-blue">
                            <span className="iconbox"> <i className="fa fa-envelope fa-4x"/>
                                <span>
                                    Mail
                                    <span className="label pull-right bg-color-darken">14</span>
                                </span>
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/profile" className="jarvismetro-tile big-cubes selected bg-color-pinkDark">
                            <span className="iconbox"> <i className="fa fa-user fa-4x" />
                                <span>My Profile </span>
                            </span>
                        </Link>
                    </li>
                </ul>
            </div>
        );
    }
}