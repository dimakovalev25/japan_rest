import React, {useEffect, useState} from "react";

import styles from './MealList.module.css'
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import useHttp from "../../hooks/use-http";

// const DUMMY_MEALS = [
//     {
//         id: "m1",
//         name: 'Sushi Naomi',
//         description:
//             "Filadelfia cheese, chicken fillet, masago, tomato, cucumber, sesame",
//         price: 11.99,
//     },
//     {
//         id: "m2",
//         name: "Sushi Weet ",
//         description: "Chicken fillet, masago, tomato, cucumber, sesame",
//         price: 3.99,
//     },
//     {
//         id: "m3",
//         name: "Sushi with eel",
//         description: "Smoked eel, unagi sauce, sesame",
//         price: 4.99,
//     },
//     {
//         id: "m4",
//         name: 'Poke Salad with Salmon"',
//         description:
//             "Rice, salmon, cucumber, chuka, nori, tuna shavings, walnut sauce",
//         price: 7.99,
//     },
//     {
//         id: "m5",
//         name: "Sushi with snake",
//         description: "Smoked eel, unagi sauce, sesame",
//         price: 19.99,
//     },
//     {
//         id: "m6",
//         name: "Sushi with rock",
//         description: "Smoked eel, unagi sauce, sesame",
//         price: 9.99,
//     }
// ];

export const MealList = function () {
    const [products, setProducts] = useState([]);
    const httpRequestData = useHttp();
    const {isLoading, error, sendHttpRequest} = httpRequestData;

    useEffect(() => {
        const manageProducts = function (data) {
            const loadedProducts = [];
            for (const productKey in data) {
                loadedProducts.push(
                    {
                        id: data[productKey].id,
                        description: data[productKey].description,
                        name: data[productKey].name,
                        price: data[productKey].price,
                    }
                );
            }
            setProducts(loadedProducts);
        }

        sendHttpRequest({
            url: 'https://react-course-86712-default-rtdb.europe-west1.firebasedatabase.app/products.json'
        }, manageProducts)

    }, [sendHttpRequest])

    const mealList = products.map((meal) => <MealItem
        description={meal.description}
        id={meal.id}
        price={meal.price}
        key={meal.id}
        name={meal.name}>{meal.name}</MealItem>);

    return (
        <section className={styles.meals}>
            <Card>
                <ul>{!isLoading ? mealList : <p>Loading...</p>}</ul>
            </Card>
        </section>
    )
}
