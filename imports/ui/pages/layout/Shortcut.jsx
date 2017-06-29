import React, { Component} from 'react'

import {Link} from 'react-router'

export default class Shortcut extends Component {

    render() {
        return (
            <div id="shortcut">
                <ul>
                    <li>
                        <Link to="/profile" className="jarvismetro-tile big-cubes bg-color-pinkDark">
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