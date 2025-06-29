import React from 'react';
import CustomerList from '../components/Customers/CustomerList';

const CustomerPage = () => {
    return (
        <div className="container mt-4">
            <h3>Customers</h3>
            <CustomerList />
        </div>
    );
};

export default CustomerPage;
