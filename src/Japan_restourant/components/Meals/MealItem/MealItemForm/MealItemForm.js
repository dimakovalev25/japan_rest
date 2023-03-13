import styles from './MealItemForm.module.css'
import Input from "../../../UI/Input";
import {useRef, useState} from "react";

const MealItemForm = (props) => {

    const [isAmountValid, setIsAmountValid] = useState(true)

    const amountInputRef = useRef();
    const submitHandler = (e) => {
        e.preventDefault();

        const inputAmount = amountInputRef.current.value;
        if(inputAmount.trim().length === 0 || +inputAmount < 1 || +inputAmount > 10) {
            setIsAmountValid(false)
            return;
        }

        props.onAddToCart(+inputAmount)

    }
    return (
        <form onSubmit={submitHandler} className={styles.form}>
            <Input
                ref={amountInputRef}
                label={'QUANTITY'} input={{
                id: props.id,
                type: 'number',
                min: '1',
                step: '1',
                defaultValue: '1',
            }}/>
            <button>Add</button>
            {!isAmountValid && <p>Enter a number from 1 to 10</p>}
        </form>
    )
}
export default MealItemForm;
