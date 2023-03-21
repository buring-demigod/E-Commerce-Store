import React, { useContext, useState, useEffect, createContext } from 'react';
import { toast } from 'react-hot-toast';

const context = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItem, setCartItem] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    let foundProduct;
    let index;

    const incQty = () => {
        setQty((preQty) => preQty + 1);
    }

    const decQty = () => {
        setQty((preQty) => {
            if (preQty - 1 < 1) return 1;
            return preQty - 1;
        });
    }

    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItem.find(item => item._id === product._id);
        setTotalPrice((preTotal) => preTotal + (product.price) * quantity);
        setTotalQuantities((preQuantities) => preQuantities + quantity);

        if (checkProductInCart) {
            const updatedCart = cartItem.map((item) => {
                if (item._id === product._id) return {
                    ...item,
                    quantity: item.quantity + quantity
                }
            });

            setCartItem(updatedCart);
            toast.success(`${qty} ${product.name} is added to cart`);
        }
        else {
            product.quantity = quantity;
            setCartItem([
                ...cartItem,
                { ...product }
            ]);
        }
    }

    const toggleCartItemQuantity = (id, value) => {
        foundProduct = cartItem.find(item => item._id === id);
        index = cartItem.findIndex(prod => prod._id === id);
        const newCartItems = cartItem.filter(item => item._id !== id);

        if (value === 'inc') {
            setCartItem([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 }]);
            setTotalPrice((prevTotal) => prevTotal + foundProduct.price);
            setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
        } else if (value === 'dec') {
            if (foundProduct.quantity > 1) {
                setCartItem([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 }]);
                setTotalPrice((prevTotal) => prevTotal - foundProduct.price);
                setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
            }
        }
    }

    const onRemove = (product) => {
        foundProduct = cartItem.find(item => item._id === product._id);
        const newCartItems = cartItem.filter(item => item._id !== product._id);
        setTotalPrice((prevTotal) => prevTotal - foundProduct.price * foundProduct.quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity);
        setCartItem(newCartItems);
    }

    return (
        <context.Provider
            value={{
                showCart,
                cartItem,
                totalPrice,
                totalQuantities,
                qty,
                incQty,
                decQty,
                onAdd,
                setShowCart,
                toggleCartItemQuantity,
                onRemove,
                setCartItem,
                setTotalPrice,
                setTotalQuantities
            }}
        >
            {children}
        </context.Provider>
    );
}

export const useStateContext = () => {
    return useContext(context);
}