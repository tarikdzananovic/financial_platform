import React from 'react';
import IndexSelector from '../containers/IndexSelector.jsx';

const Index = ({ children }) => (
    <div>
        <IndexSelector />
    </div>
);

Index.propTypes = {
    children: React.PropTypes.node,
};

export default Index;