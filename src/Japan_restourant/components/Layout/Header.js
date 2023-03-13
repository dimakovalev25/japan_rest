import React from "react";
import sushiImg from '../../assets/suwuu.jpg'
import styles from './Header.module.css'
import {HeaderCartButton} from "./HeaderCartButton";
import CartContext from "../../store/cart-context";
import {useContext} from "react";

export const Header = function (props) {
    // console.log(props)
    const cartContext = useContext(CartContext)

    return (
        <React.Fragment>

            <header className={styles.header}>
                <h1>{cartContext.name}</h1>
                <HeaderCartButton onClick={props.onShowCart}/>
            </header>
            <div className={styles['main-image']}>
                <img src={sushiImg} alt={'sushi'}></img>
            </div>

        </React.Fragment>
    )
}