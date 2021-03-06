import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import IndexSelector from '../components/index/IndexSelector.jsx';

const composer = (props, onData) => onData(null, { hasUser: Meteor.user() });

export default composeWithTracker(composer, {}, {}, { pure: false })(IndexSelector);