import {useState, useEffect} from 'react';
import {useParams} from "react-router";
import {Route, Routes} from "react-router-dom";
import Order from "./Order";


function Orders() {
    const [orders, setOrders] = useState([]);
    const [restaurant, setRestaurant] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const {id} = useParams();


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
                <span className="btn btn-success">Active: </span>

                {orders.map(order => (order.completed === true && (<Order useFor="restaurant" restaurantName={restaurant.name}
                                                                          refreshRestaurant={(e) => (refreshRestaurant())}
                                                                          order={order} key={order._id}></Order>)))}

            </div>
            <div className="container-md" style={{border:"solid 5px whitesmoke", borderRadius:"15px"}}>
                <span className="btn btn-secondary">Completed: </span>
                {orders.map(order => (order.completed === false && (<Order useFor="restaurant" restaurantName={restaurant.name}
                                                                           refreshRestaurant={(e) => (refreshRestaurant())}
                                                                           order={order} key={order._id}></Order>)))}

            </div>
        </div>
    );
}

export default Orders;