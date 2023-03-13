import styles from "./PromoText.module.css";

const PromoText = () => {
  return (
    <section className={styles["promo-text"]}>
      <h2>Online Sushi Restaurant</h2>
      <h3>
          An online sushi restaurant where your favorite sushi and sashimi,
          rolls and other dishes of national Japanese cuisine are made by a team of
          professional chefs.
      </h3>
      {/*<p>*/}
      {/*    Fast work and quality products, as well as the most real*/}
      {/*    components give a good taste to the dishes, give the pleasure of the meal.*/}
      {/*</p>*/}
    </section>
  );
};

export default PromoText;
