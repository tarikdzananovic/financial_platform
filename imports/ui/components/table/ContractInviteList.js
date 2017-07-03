import React, { PropTypes } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

/**
 A product list component which shows the table with list of data
 **/
const ContractInviteList = ({
    products,
    activePage,
    onNavigatePage
}) => {
    const productList = products.productList;

    const options = {
        hideSizePerPage: true,
        page: activePage,
        onPageChange: onNavigatePage
    };

    return
};

ContractInviteList.propTypes = {
    products: PropTypes.object.isRequired,
    activePage: PropTypes.number.isRequired,
    onNavigatePage: PropTypes.func.isRequired
};

export default ContractInviteList;