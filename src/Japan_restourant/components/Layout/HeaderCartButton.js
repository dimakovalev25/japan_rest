import CartContext from "../../store/cart-context";
import {useContext, useEffect, useState} from "react";

import CartIcon from "../Cart/CartIcon";
import styles from './HeaderCartButton.module.css'


export const HeaderCartButton = function (props) {

    const [buttonIsAnimated, setButtonIsAnimated] = useState(false)

    const cartContext = useContext(CartContext)

    const cartItemsNumber = cartContext.items.reduce((currentValue, item) => {
        return currentValue + item.amount
    }, 0)

    const buttonClasses = `${styles.button} ${buttonIsAnimated ? styles.bump : '' }`;

    useEffect(() => {
        if(cartContext.items.length === 0){
            return
        }
        setButtonIsAnimated(true);
        const timer = setTimeout(() => {
            setButtonIsAnimated(false)
        }, 300);

        return () => {
            clearTimeout(timer)
        }
    }, [cartContext.items]);


    return (
        <button onClick={props.onClick} className={buttonClasses}>
            <span className={styles.icon}><CartIcon/></span>
            <span>Cart</span>
            <span className={styles.badge}>{cartItemsNumber}</span>
        </button>
    )
}