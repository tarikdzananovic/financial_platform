/**
 * Created by lejlatarik on 6/19/17.
 */
import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';

const logout = () => {
    Meteor.logout();
    browserHistory.push('/login');
};

export default function handleLogout() {
    logout();
}
