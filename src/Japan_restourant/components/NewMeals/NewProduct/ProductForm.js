import {useRef} from "react";

import styles from "./ProductForm.module.css";

const ProductForm = (props) => {
    const productInputRef = useRef();
    const descriptionInputRef = useRef();
    const priceInputRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault();

        let enteredMeal = productInputRef.current.value;
        let enteredDescription = descriptionInputRef.current.value;
        let enteredPrice = priceInputRef.current.value;

        if (enteredMeal.trim().length > 0 && enteredDescription.trim().length > 0 && enteredPrice.trim().length > 0) {

            const enteredValue = {
                id: Math.random().toFixed(3)+enteredMeal,
                name: enteredMeal,
                description: enteredDescription,
                price: enteredPrice
            }

            // console.log(enteredValue)
            props.onEnterProduct(enteredValue);

            productInputRef.current.value='';
            descriptionInputRef.current.value='';
            priceInputRef.current.value='';


        }
    };

    return (
        <form className={styles.form} onSubmit={submitHandler}>
            <input placeholder={'meal'} type="text" ref={productInputRef}/>
            <input placeholder={'description'} type="text" ref={descriptionInputRef}/>
            <input className={styles.inputPrice} placeholder={'price'} type="number" ref={priceInputRef}/>
            <button>
                {"Add"}
            </button>


        </form>
    );
};

export default ProductForm;
