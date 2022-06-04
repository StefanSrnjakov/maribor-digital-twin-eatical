import React, {useState, useEffect} from 'react';
import Order from "./Order";
import {useContext} from "react";
import {AccountContext} from "../../AccountContext";


function Orders(props) {
    const [orders, setOrders] = useState([]);
    const [restaurant, setRestaurant] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const id = useContext(AccountContext).account.restaurant._id;

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

    return (<div className="container"
                 style={{backgroundColor: "white", padding: "20px", marginTop: "30px", borderRadius: "10px"}}>
        {isLoaded === true && <span style={{textAlign: "left"}}><h3>{restaurant.name}</h3></span>}
        <div className="container-md">
            <span className="btn btn-success">Active: </span>

            {orders.map(order => (order.completed === false && (
                <div key={order._id}><Order isCompleted = "false" useFor="restaurant" isActive="true" restaurantName={restaurant.name}
                       refreshRestaurant={(e) => (refreshRestaurant())}
                            order={order} ></Order></div>)))}

        </div>
        <div className="container-md"  style={{border: "solid 5px whitesmoke", borderRadius: "15px"}}>
            <span className="btn btn-secondary">Completed: </span>
            {orders.map(order => (order.completed === true && (
                <div key={order._id}><Order useFor="restaurant" isCompleted="true"  restaurantName={restaurant.name}
                       refreshRestaurant={(e) => (refreshRestaurant())}
                       order={order} ></Order></div>)))}

        </div>
    </div>);
}

export default Orders;