import React, {useState, useEffect} from 'react';
import Order from "./Order";
import {useContext} from "react";
import {AccountContext} from "../../AccountContext";
import './../styles/formStyle.css'


function Orders(props) {
    const [orders, setOrders] = useState([]);
    const [restaurant, setRestaurant] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const id = useContext(AccountContext).account.restaurant._id;
    const now = new Date();


    const getRestaurant = async function () {
        const res = await fetch("http://localhost:5000/restaurant/" + id);
        const data = await res.json();
        setOrders(data.orders);
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

                {orders.map(order => (new Date(order.pick_up_time) > now && (
                    <div key={order._id}><Order useFor="restaurant" isActive="true" restaurantName={restaurant.name}
                                                refreshRestaurant={(e) => (refreshRestaurant())}
                                                order={order}></Order></div>)))}

            </div>
            <div className="container-md" style={{border: "solid 5px whitesmoke", borderRadius: "15px"}}>
                <span className="btn purple">Completed: </span>
                {orders.map(order => (new Date(order.pick_up_time) < now && (
                    <div key={order._id}><Order useFor="restaurant" restaurantName={restaurant.name}
                                                refreshRestaurant={(e) => (refreshRestaurant())}
                                                order={order}></Order></div>)))}

            </div>
        </div>
    );
}

export default Orders;