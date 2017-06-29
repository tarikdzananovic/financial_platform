/**
 * Created by griga on 11/17/15.
 */

import React, { Component } from 'react'

import ToggleMenu from '../../components/layout/actions/ToggleMenu.jsx'
import SearchMobile from '../../components/layout/actions/SearchMobile.jsx'

import DeviceDetect from '../../components/layout/tools/DeviceDetect.jsx'
import ActivitiesDropdown from '../../components/activities/ActivitiesDropdown.jsx'

import RecentProjects from './header/RecentProjects.jsx'
import handleLogout from '../../../modules/auth/logout';

import bizEditor from '../../../modules/biz-editor';
import { Meteor } from 'meteor/meteor';
import { Bizes } from '../../../api/bizes.js';

import bizesList from '../../../modules/biz-editor';

export default class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            bizes: Meteor.subscribe('bizes'),
        };

        this.logout = this.logout.bind(this);
    }

    logout() {
        //handleLogout();

        /*let biz = {
            "userId": Meteor.user()._id,
            "name" : "Biz1",
            "email": "biz1@example.com",
            "phone": "0123456789",
            "address": "Baker Street 22B"
        };
        console.log("User id: " + Meteor.user()._id);
        bizEditor(biz);*/






        bizesList();

    }

    render() {
        return (<header id="header">
            <div id="logo-group">
                <span id="logo">
                </span>
                {/* Note: The activity badge color changes when clicked and resets the number to 0
                 Suggestion: You may want to set a flag when this happens to tick off all checked messages / notifications */}

                <ActivitiesDropdown url={'api/activities/activities.json'} />
            </div>

            <RecentProjects />
            <div className="pull-right"  /*pulled right: nav area*/ >

                <ToggleMenu className="btn-header pull-right"  /* collapse menu button */ />

                {/* #MOBILE */}
                {/*  Top menu profile link : this shows only when top menu is active */}
                <ul id="mobile-profile-img" className="header-dropdown-list hidden-xs padding-5">
                    <li className="">
                        <a className="dropdown-toggle no-margin userdropdown" data-toggle="dropdown">
                            <img src="styles/img/avatars/sunny.png" alt="John Doe" className="online"/>
                        </a>
                        <ul className="dropdown-menu pull-right">
                            <li>
                                <a className="padding-10 padding-top-0 padding-bottom-0"><i
                                    className="fa fa-cog"/> Setting</a>
                            </li>
                            <li className="divider"/>
                            <li>
                                <a href="#/views/profile"
                                   className="padding-10 padding-top-0 padding-bottom-0"> <i className="fa fa-user"/>
                                    <u>P</u>rofile</a>
                            </li>
                            <li className="divider"/>
                            <li>
                                <a  className="padding-10 padding-top-0 padding-bottom-0"
                                   data-action="toggleShortcut"><i className="fa fa-arrow-down"/> <u>S</u>hortcut</a>
                            </li>
                            <li className="divider"/>
                            <li>
                                <a href className="padding-10 padding-top-5 padding-bottom-5"
                                   data-action="userLogout"><i className="fa fa-sign-out fa-lg"/> <strong><u>L</u>ogout</strong></a>
                            </li>
                        </ul>
                    </li>
                </ul>

                {/* logout button */}
                <div id="logout" className="btn-header transparent pull-right">
                    <span> <a onClick={this.logout} title="Sign Out"><i
                        className="fa fa-sign-out"/></a> </span>
                </div>

                {/* search mobile button (this is hidden till mobile view port) */}
                <SearchMobile className="btn-header transparent pull-right"/>


                {/* input: search field */}
                <form action="#/misc/search.html" className="header-search pull-right">
                    <input id="search-fld" type="text" name="param" placeholder="Find reports and more"
                           data-autocomplete='[
					"ActionScript",
					"AppleScript",
					"Asp",
					"BASIC",
					"C",
					"C++",
					"Clojure",
					"COBOL",
					"ColdFusion",
					"Erlang",
					"Fortran",
					"Groovy",
					"Haskell",
					"Java",
					"JavaScript",
					"Lisp",
					"Perl",
					"PHP",
					"Python",
					"Ruby",
					"Scala",
					"Scheme"]'/>
                    <button type="submit">
                        <i className="fa fa-search"/>
                    </button>
                    <a href="$" id="cancel-search-js" title="Cancel Search"><i className="fa fa-times"/></a>
                </form>


            </div>
            {/* end pulled right: nav area */}

            <DeviceDetect />


        </header>
        );
    }
}



