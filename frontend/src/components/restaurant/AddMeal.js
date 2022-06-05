import React, {useState, useEffect} from 'react';
import {useContext} from "react";
import {AccountContext} from "../../AccountContext";


function AddMeal(props) {
    const [allergens, setAllergens] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checkedCategories, setCheckedCategories] = useState([]);
    const [checkedAllergens, setCheckedAllergens] = useState([]);
    const [title, setTitle] = useState("");
    const [size, setSize] = useState("");
    const [price, setPrice] = useState(0);
    const restaurantId = useContext(AccountContext).account.restaurant._id;



    useEffect(function () {
        const getAllergens = async function () {
            const res = await fetch("http://localhost:5000/allergen");
            const data = await res.json();
            setAllergens(data);
        }
        getAllergens();
    }, []);
    useEffect(function () {
        const getCategories = async function () {
            const res = await fetch("http://localhost:5000/category");
            const data = await res.json();
            setCategories(data);
        }
        getCategories();
    }, []);

    const handleCheckCategory = (event) => {
        let updatedList = [...checkedCategories];
        if (event.target.checked) {
            updatedList = [...checkedCategories, event.target.name];
        } else {
            updatedList.splice(checkedCategories.indexOf(event.target.value), 1);
        }
        setCheckedCategories(updatedList);
    }
    const handleCheckAllergens = (event) => {
        var updatedList = [...checkedAllergens];
        if (event.target.checked) {
            updatedList = [...checkedAllergens, event.target.name];
        } else {
            updatedList.splice(checkedAllergens.indexOf(event.target.value), 1);
        }
        setCheckedAllergens(updatedList);
    };

    async function handleSubmit(e){
        e.preventDefault();
        await fetch("http://localhost:5000/meal", {
            method: "POST",
            credentials: "include",
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                "name": title,
                "allergens": checkedAllergens,
                "category": checkedCategories,
                "size": size,
                "restaurant_id" : restaurantId,
                "price" : price
            })
        });
        props.refreshRestaurant();
    }
    return (
        <div className="container"
             style={{margin: "10px", padding: "10px", border: "solid 2px whitesmoke", borderRadius: "10px"}}>

            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-8" style={{textAlign: "left"}}>
                        <input onChange={(e) => (setTitle(e.target.value))} style={{margin: "5px"}}
                               className="form-control" type="text" name="title" placeholder="title"/>
                        <input onChange={(e) => (setSize(e.target.value))} style={{margin: "5px"}}
                               className="form-control" type="text" name="size" placeholder="size"/>
                        <div style={{margin: "15px"}}>
                            {allergens.lenth !== 0 && allergens.map(allergen => (
                                <span key={allergen._id} style={{marginLeft: "5px"}}>
                                    <input onChange={handleCheckAllergens} type="checkbox" className="btn-check"
                                           name={allergen._id}
                                           id={allergen._id}
                                           autoComplete="off" style={{display: "inline"}}/>
                                    <label className="btn btn-outline-secondary"
                                           htmlFor={allergen._id}>{allergen.title}</label>
                                </span>))}
                        </div>
                    </div>
                    <div className="col-4" style={{textAlign: "right"}}>
                        <div style={{margin: "15px"}}>
                            {categories.length !== 0 && categories.map(category => (
                                <span key={category._id} style={{marginLeft: "5px"}}>
                                    <input onChange={handleCheckCategory} type="checkbox" className="btn-check"
                                           name={category._id}
                                           id={category._id}
                                           autoComplete="off" style={{display: "inline"}}/>
                                    <label className="btn btn-outline-primary"
                                           htmlFor={category._id}>{category.title}</label>
                                </span>))}
                        </div>
                        <input className="form-control" onChange={(e) => (setPrice(e.target.value))} type="number"
                               name="price" placeholder="price in $"/>
                        <div style={{margin: "5px"}}>
                            <input className="btn btn-primary" type="submit" name="submit"
                                   value="Create"/></div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddMeal;