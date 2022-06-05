import React, {useState, useEffect} from 'react';
import Order from "../restaurant/Order";
import {useContext} from "react";
import {AccountContext} from "../../AccountContext";
import {useParams} from "react-router-dom";
import '../styles/formStyle.css'


function ActiveOrders(props) {
    const [activeOrders, setActiveOrders] = useState([]);
    const [restaurant, setRestaurant] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const id = useParams();


    const getRestaurant = async function () {
        const res = await fetch("http://localhost:5000/restaurant/" + id.id);
        const data = await res.json();
        setActiveOrders(data.orders);
        setRestaurant(data);
        setIsLoaded(true);
    }

    useEffect(function () {
        getRestaurant();
    }, []);

    async function refreshRestaurant() {
        getRestaurant();
    }

    return (
        <div className="container"
             style={{backgroundColor: "white", padding: "20px", marginTop: "30px", borderRadius: "10px"}}>
            {isLoaded === true && <span style={{textAlign: "left"}}><h3>{restaurant.name}</h3></span>}
            <div className="container-md">
                <span className="btn yellow">Active: </span>

                {activeOrders.map(order => (order.completed === false && (
                    <div key={order._id}><Order useFor="user" toCreate="true" userName={restaurant.name}
                                                refreshRestaurant={(e) => (refreshRestaurant())}
                                                order={order} ></Order></div>)))}

            </div>

        </div>
    );
}

export default ActiveOrders;