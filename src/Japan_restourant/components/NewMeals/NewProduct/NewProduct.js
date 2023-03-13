import { useState } from "react";
import ProductForm from "./ProductForm";
import styles from "../../Meals/MealList.module.css";
// import Section from "../UI/Section";

const NewProduct = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const enterProductHandler = async (newMeal) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://react-course-86712-default-rtdb.europe-west1.firebasedatabase.app/products.json",
        {
          method: "POST",
          body: JSON.stringify(newMeal),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error fetching product");
      }

    } catch (e) {
      setError(e.message || "err...");
    }
  };

  return (
    <section className={styles.meals}>
        <h5>Mini Administration panel</h5>
      <ProductForm onEnterProduct={enterProductHandler} />
    </section>
  );
};

export default NewProduct;
