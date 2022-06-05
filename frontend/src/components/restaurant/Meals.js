import React, {useState, useEffect} from 'react';
import Meal from "./Meal";
import AddMeal from "./AddMeal";
import {useContext} from "react";
import {AccountContext} from "../../AccountContext";
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';


function Meals() {
    const [meals, setMeals] = useState([]);

    const [selectedMealsId, setSelectedMealsId] = useState([]);
    const [selectedMealsPrice, setSelectedMealsPrice] = useState([]);
    const [pickUpTime, setPickUpTime] = useState();
    const [orderUpToTime, setOrderUpToTime] = useState();

    const [restaurant, setRestaurant] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const [isAddNewMealClicked, setAddNewMeal] = useState(false);
    const [isSelectMealsClicked, setSelectMeals] = useState(false)


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
        setAddNewMeal(true);
        setSelectMeals(false);
        setSelectedMealsId([]);
        setSelectedMealsPrice([]);
    }

    function selectMealsHandle() {
        setSelectMeals(true);
        setAddNewMeal(false);
    }

    async function publishSelected(e) {
        e.preventDefault();
        for (let i = 0; i < selectedMealsId.length; i++) {
            const res = await fetch("http://localhost:5000/order", {
                method: "POST",
                credentials: "include",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    "price": selectedMealsPrice[i],
                    "meal_id": selectedMealsId[i],
                    "pick_up_time": pickUpTime,
                    "order_time" : orderUpToTime
                })
            });
        }
        setSelectedMealsId([]);
        setSelectedMealsPrice([]);
        setSelectMeals(false);
        setAddNewMeal(false);
    }

    const selectMealHandle = (event) => {
        let updatedListId = [...selectedMealsId];
        let updatedListPrice = [...selectedMealsPrice];
        if (event.target.checked) {
            updatedListId = [...selectedMealsId, event.target.id];
            updatedListPrice = [...selectedMealsPrice, event.target.name];
        } else {
            updatedListId.splice(selectedMealsId.indexOf(event.target.id), 1);
            updatedListPrice.splice(selectedMealsPrice.indexOf(event.target.name), 1);
        }
        setSelectedMealsId(updatedListId);
        setSelectedMealsPrice(updatedListPrice);
    }

    async function refreshRestaurant() {
        getRestaurant();
        setAddNewMeal(false);
    }

    return (
        <div className="container"
             style={{backgroundColor: "white", padding: "20px", marginTop: "30px", borderRadius: "10px"}}>
            {isLoaded === true && <span style={{textAlign: "left"}}><h3>{restaurant.name}</h3></span>}
            <div className="container-md">
                {meals.map(meal => meal.is_deleted? <></> : (<div key={meal._id} className="container"
                                         style={{
                                             margin: "10px",
                                             padding: "10px",
                                             border: "solid 2px whitesmoke",
                                             borderRadius: "10px"
                                         }}>
                    <Meal isSelectMealsClicked={isSelectMealsClicked} useFor="meal"
                          refreshRestaurant={(e) => (refreshRestaurant())} meal={meal}
                    ></Meal>
                    {isSelectMealsClicked &&
                        <div><input type="checkbox" className="btn-check" onChange={selectMealHandle}
                                    name={meal.price}
                                    id={meal._id}
                                    autoComplete="off" style={{display: "inline"}}></input>
                            <label style={{marginLeft: "5px"}} className="btn btn-outline-success"
                                   htmlFor={meal._id}><AddTaskOutlinedIcon/></label>
                            {/*order up to*/}
                            {/*                        pick up time*/}
                        </div>}
                </div>))}
                {selectedMealsId.length > 0 &&
                    <form onSubmit={publishSelected}>
                        <div style={{margin: "10px"}}>
                            <label>Order up to:</label>
                            <input onChange={(e) => (setOrderUpToTime(e.target.value))} style={{marginLeft: "10px"}}
                                   name="orderUpTo" type="datetime-local"/> <br/>
                        </div>
                        <div style={{margin: "10px"}}>
                            <label>Pick up time:</label>
                            <input onChange={(e) => (setPickUpTime(e.target.value))} style={{marginLeft: "10px"}}
                                   name="pickUpTime" type="datetime-local"/> <br/>
                        </div>
                        <input type="submit" style={{margin: "5px"}} className="btn btn-primary"
                               onClick={publishSelected} value="Publish selected"/>
                    </form>}
                {!isAddNewMealClicked &&
                    <button className="btn btn-primary" onClick={addNewHandle}>Add new meal</button>}
                {!isSelectMealsClicked &&
                    <button className="btn btn-primary" style={{marginLeft: "5px"}} onClick={selectMealsHandle}>Select
                        meals</button>}
                {isAddNewMealClicked && <AddMeal refreshRestaurant={(e) => (refreshRestaurant())}></AddMeal>}


            </div>
        </div>
    );
}

export default Meals;