import React, {useEffect, useState, useCallback} from "react";
import useHttp from "../../hooks/use-http";
import NewProduct from "./NewProduct/NewProduct";

function AppNewMeal() {
    const [products, setProducts] = useState([]);

    const httpRequestData = useHttp()

    const {isLoading, error, sendHttpRequest: fetchProducts} = httpRequestData;

    useEffect(() => {
        const manageProducts = function (productsData) {
            const loadedProducts = [];
            for (const productKey in productsData) {
                loadedProducts.push({id: productKey, text: productsData[productKey].text});
            }
            setProducts(loadedProducts);
        }

        fetchProducts({
            url: "https://react-course-86712-default-rtdb.europe-west1.firebasedatabase.app/products.json",

        }, manageProducts);
    }, [fetchProducts])
    const productAddHandler = (product) => {
        setProducts((prevProducts) => prevProducts.concat(product));
    };

    return (
        <React.Fragment>
            <NewProduct onAddProduct={productAddHandler}/>
        </React.Fragment>
    );
}

export default AppNewMeal;
