import React from 'react';
import ClientOrder from './page/client/Order';
import {Route} from 'react-router-dom';
import Login from './page/client/Login';

const Details = () => {
    return (
        < div >
        < Route
    path = '/client/order'
    component = {ClientOrder}
    />
    < Route
    path = '/login'
    component = {Login}
    />
    </div>
)
    ;
}

export default Details;