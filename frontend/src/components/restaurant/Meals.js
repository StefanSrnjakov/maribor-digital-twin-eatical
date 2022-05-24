import React, {useState, useEffect} from 'react';
import Meal from "./Meal";
import AddMeal from "./AddMeal";
import {useContext} from "react";
import {AccountContext} from "../../AccountContext";


function Meals() {
    const [meals, setMeals] = useState([]);
    const [restaurant, setRestaurant] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const [isAddNewClicked, setAddNew] = useState(false);
    const id = useContext(AccountContext).account.restaurant._id;

    const getRestaurant = async function () {
        const res = await fetch("http://localhost:5000/restaurant/" + id);
        const data = await res.json();
        setMeals(data.meals);
        setRestaurant(data);
        setIsLoaded(true);
    }

    useEffect(function () {
        getRestaurant();
    }, []);
    function addNewHandle() {
        setAddNew(true);
    }
    async function refreshRestaurant() {
        getRestaurant();
        setAddNew(false);
    }
    return (
        <div className="container"
             style={{backgroundColor: "white", padding: "20px", marginTop: "30px", borderRadius: "10px"}}>
            {isLoaded === true && <span style={{textAlign:"left"}}><h3>{restaurant.name}</h3></span>}
            <div className="container-md">
                {meals.map(meal => (<Meal useFor="meal" refreshRestaurant={(e)=>(refreshRestaurant())} meal={meal} key={meal._id}></Meal>))}
                {!isAddNewClicked && <button className="btn btn-primary" onClick={addNewHandle}>Add new meal</button>}
                {isAddNewClicked && <AddMeal refreshRestaurant={(e)=>(refreshRestaurant())} ></AddMeal>}
            </div>
        </div>
    );
}

export default Meals;