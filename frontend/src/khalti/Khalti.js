import React from 'react'
import KhaltiCheckout from "khalti-checkout-web";
import config from './KhaltiConfig';
import { useSelector } from 'react-redux';

export default function Khalti() {
    const cart = useSelector(state => state.cart);
    const checkout = new KhaltiCheckout(config);

    const handleClick = () => {
        checkout.show({amount: cart.totalPrice * 100});
    }

    return (
        <button onClick={handleClick}> Pay Via Khalti </button>
    )
}