import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router';
import PublicNavigation from './PublicNavigation.jsx';
import AuthenticatedNavigation from './AuthenticatedNavigation.jsx';

const renderNavigation = hasUser => (hasUser ? <AuthenticatedNavigation /> : <PublicNavigation />);

const AppNavigation = ({ hasUser }) => (
    <Navbar>
        <Navbar.Header>
            <Navbar.Brand>
                <Link to="/">Application Name</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
            { renderNavigation(hasUser) }
        </Navbar.Collapse>
    </Navbar>
);

AppNavigation.propTypes = {
    hasUser: React.PropTypes.object,
};

export default AppNavigation;