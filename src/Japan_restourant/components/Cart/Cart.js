import styles from './Cart.module.css'
import Modal from "../UI/Modal";
import {useContext, useRef, useState} from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import OrderForm from "../OrderForm/OrderForm";

const Cart = function (props) {
    const cartContext = useContext(CartContext);

    const amountInputRef = useRef();
    const totalAmount = (Math.abs(cartContext.totalAmount).toFixed(2)) + ' $';
    const hasItems = cartContext.items.length > 0;


    // let cartOrder = cartContext.items;
    let cartOrder = [...cartContext.items, {promocod: cartContext.usedPromocod}, {totalAmount: totalAmount} ];
    // console.log(cartOrder)

    const [showPromoError, setShowPromoError] = useState(true);
    const [isShowOrderForm, setIsShowOrderForm] = useState(false);


    const setInputValue = (e) => {
        e.preventDefault();
        const inputAmount = amountInputRef.current.value;
        cartContext.addPromoCod(inputAmount);

        let checkPromo = cartContext.promocod.includes(inputAmount);
        // console.log(checkPromo)
        if (checkPromo === false) {
            setShowPromoError(false)
        } else if (checkPromo === true) {
            setShowPromoError(true)
        }
    }
    const removeCartItemHandler = (id) => {
        cartContext.removeItem(id);
    }
    const addCartItemHandler = (item) => {
        cartContext.addItem({...item, amount: 1})
    }

    const showOrderForm = () => {
        setIsShowOrderForm(true)
        // console.log(CartContext.items)
    }

    const cartItems = (
        <ul className={styles['cart-items']}>
            {cartContext.items.map((item) => (<CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onAdd={addCartItemHandler.bind(null, item)}
                    onRemove={removeCartItemHandler.bind(null, item.id)}
                >{item.name}</CartItem>
            ))}
        </ul>
    );

    return (
            <Modal onHideCart={props.onHideCart}>
                {cartItems}
                <div className={styles.total}>
                    <span></span>
                    <span>ALL {totalAmount}</span>
                </div>
                <div className={styles.actions}>

                    {!cartContext.usedPromocod ? <form onSubmit={setInputValue}>
                        <input
                            ref={amountInputRef}
                            className={styles.cartinput}
                            placeholder={'add promoCod and press ENTER'}
                            type={'text'}>
                        </input>
                    </form> : ''}

                    {!showPromoError && !cartContext.usedPromocod ?
                        <p style={{color: 'red'}}>promo code is not valid! try another!</p> : ''}

                    {!cartContext.usedPromocod ? '' : <p style={{color: '#f36b40'}}>your discount is approved!</p>}

                    <button onClick={props.onHideCart} className={styles['button--alt']}>Close</button>
                    {hasItems && <button onClick={showOrderForm} className={styles.button}>Order</button>}
                </div>

                {/*{isShowOrderForm ? <OrderForm cartOrder={cartOrder}/> : ''}*/}
                <OrderForm cartOrder={cartOrder}/>

            </Modal>

    )

}
export default Cart;
