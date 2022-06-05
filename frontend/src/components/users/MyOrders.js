import React, {useState, useEffect} from 'react';
import Order from "../restaurant/Order";
import {useContext} from "react";
import {AccountContext} from "../../AccountContext";
import Chip from '@mui/material/Chip';
import FaceIcon from '@mui/icons-material/Face';
import './../styles/formStyle.css'


function MyOrders(props) {
    const [myOrders, setMyOrders] = useState([]);
    const [user, setUser] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const id = useContext(AccountContext).account.user._id;
    const now = new Date();

    const getUser = async function () {
        const res = await fetch("http://localhost:5000/user/" + id);
        const data = await res.json();
        setMyOrders(data.orders);
        setUser(data);
        setIsLoaded(true);
    }
    useEffect(function () {
        getUser();
    }, []);
    async function refreshUser() {
        getUser();
    }
    return (
        <div className="container"
             style={{backgroundColor: "white", padding: "20px", marginTop: "30px", borderRadius: "10px"}}>
            {isLoaded === true && <span style={{textAlign: "left"}}><h3><Chip icon={<FaceIcon/>} label={user.name} /></h3></span>}
            <div className="container-md">
                <span className="btn purple">Active: </span>

                {myOrders.map(order => (new Date(order.pick_up_time) >= now && (<Order useFor="user" userName={user.name}
                                                                                       refreshUser={(e) => (refreshUser())}
                                                                                       order={order} key={order._id}></Order>)))}

            </div>
            <div className="container-md" style={{border:"solid 5px whitesmoke", borderRadius:"15px"}}>
                <span className="btn yellow">Completed: </span>
                {myOrders.map(order => (new Date(order.pick_up_time) <= now && (<Order useFor="user" restaurantName={order.meal_id.restaurant_id.name} userName={user.name}
                                                                                       refreshUser={(e) => (refreshUser())}
                                                                                       order={order} key={order._id}></Order>)))}

            </div>
        </div>
    );
}
export default MyOrders;