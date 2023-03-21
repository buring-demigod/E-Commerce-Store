import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { BsBagCheckFill } from 'react-icons/bs';
import { useRouter } from 'next/router';
import { useStateContext } from '@/context/StateContext';
import { runFireWorks } from '@/lib/utils';

const Success = () => {
    const { setCartItem, setTotalPrice, setTotalQuantities } = useStateContext();
    const [order, setOrder] = useState(null)

    useEffect(() => {
        localStorage.clear();
        setCartItem([]);
        setTotalPrice(0);
        setTotalQuantities(0);
        runFireWorks();
    }, [])

    return (
        <div className='success-wrapper'>
            <div className='success'>
                <p className='icon'>
                    <BsBagCheckFill />
                </p>
                <h2>Thankyou for your order!</h2>
                <p className='email-msg'>check your email for receipt</p>
                <p className='description'>
                    if you have any queation
                    <Link className='email' href="/">order@gamil.com</Link>
                </p>
                <Link href='/'><button className='btn' type='button' width={300}>Continue shopping</button></Link>
            </div>
        </div>

    );
}

export default Success;