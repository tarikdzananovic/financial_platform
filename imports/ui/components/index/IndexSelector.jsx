import React from 'react';
import PublicIndex from '../index/PublicIndex.jsx';
import AuthenticatedIndex from '../index/AuthenticatedIndex';

const renderIndex = hasUser => (hasUser ? <AuthenticatedIndex /> : <PublicIndex />);

const IndexSelector = ({ hasUser }) => (
    <div>
        { renderIndex(hasUser) }
    </div>
);

IndexSelector.propTypes = {
    hasUser: React.PropTypes.object,
};

export default IndexSelector;