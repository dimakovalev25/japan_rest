import CartContext from './cart-context'
import {useReducer} from "react";
// import React from "react";


const defaultCartState = {
    items: [],
    totalAmount: 0,
    promocod: ['1111', '1112', '1113'],
    usedPromocod: false,
}
const cartReducer = (state, action) => {
    if (action.type === 'ADD_ITEM') {
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

        const existingCartItemIndex = state.items.findIndex((item) => {
            return item.id === action.item.id
        });

        const existingCartItem = state.items[existingCartItemIndex]

        let updatedItem;
        let updatedItems;

        if (existingCartItem) {
            updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount,
            }
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItem = {
                ...action.item
            }
            updatedItems = state.items.concat(updatedItem)
        }
        return {
            ...state,
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        }
    }

    if (action.type === 'ADD_PROMOCOD') {

        if (state.promocod.includes(action.promo)) {
            const updatedTotalAmount = state.totalAmount * 0.93;

            const updatedPromocodIndex = state.promocod.indexOf(action.promo);
            const updatedPromocod = state.promocod;
            if(updatedPromocodIndex !== -1) {
                updatedPromocod.splice(updatedPromocodIndex, 1)
            }

            return {
                ...state,
                totalAmount: updatedTotalAmount,
                promocod: updatedPromocod,
                usedPromocod: true,
            }

        }
        return {
            ...state,
            usedPromocod: false,
        }

    }

    if (action.type === 'REMOVE_ITEM') {


        const existingCartItemIndex = state.items.findIndex((item) => {
            return item.id === action.id
        });

        const existingCartItem = state.items[existingCartItemIndex];

        const updatedTotalAmount = state.totalAmount - existingCartItem.price;

        let updatedItems;
        if (existingCartItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id != action.id);

        } else {
            const updatedItem = {...existingCartItem, amount: existingCartItem.amount - 1}
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        return {
            ...state,
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }

    return defaultCartState;
}

const CartContextProvider = function (props) {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);
    const addItemHandler = item => {
        dispatchCartAction({
            type: 'ADD_ITEM',
            item: item
        });
    }

    const addPromocod = promo => {
        dispatchCartAction({
            type: 'ADD_PROMOCOD',
            promo: promo,
        })
    }
    const removeItemHandler = id => {
        dispatchCartAction({
            type: 'REMOVE_ITEM',
            id: id
        });
    }

    const cartContext = {
        name: 'Japanesse sushi さかな',
        items: cartState.items,
        promocod: cartState.promocod,
        totalAmount: cartState.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
        addPromoCod: addPromocod,
        usedPromocod: cartState.usedPromocod,
    }

    return (
        <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>

    )

}
export default CartContextProvider;
