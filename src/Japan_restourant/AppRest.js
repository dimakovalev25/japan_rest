import {Header} from "./components/Layout/Header";
import {Meals} from "./components/Meals/Meals";
import React, {useState} from "react";
import Cart from "./components/Cart/Cart";
import CartContextProvider from "./store/CartContextProvider";

export const AppRest = function () {

    const [cartIsVisible, setCartIsVisible] = useState(false);

    const showCartHandler = () => {
        setCartIsVisible(true);
    }

    const hideCartHandler = () => {
        setCartIsVisible(false);
    }

    return (
        <CartContextProvider>
            {cartIsVisible && <Cart onHideCart={hideCartHandler}/>}
            <Header onShowCart={showCartHandler}/>
            <main>
                <Meals/>
            </main>
        </CartContextProvider>
    )

}