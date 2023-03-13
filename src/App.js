import "./App.css";
import {AppRest} from "./Japan_restourant/AppRest";
import AppNewMeal from "./Japan_restourant/components/NewMeals/AppNewMeal";

const App = () => {

    return (
        <div className={'app'}>
            <AppRest></AppRest>
            <AppNewMeal/>
        </div>
    );
};

export default App;
