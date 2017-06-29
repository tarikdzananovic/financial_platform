/**
 * Created by lejlatarik on 6/19/17.
 */
import { hashHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';

const logout = () => {
    Meteor.logout();
    hashHistory.push('/login');
};

export default function handleLogout() {
    logout();
}
