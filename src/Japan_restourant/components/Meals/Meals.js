import PromoText from "./PromoText";
import {MealList} from "./MealList";
import React from "react";

export const Meals = function () {

    return (
        <React.Fragment>
            <PromoText/>
            <MealList/>
        </React.Fragment>
    )
}