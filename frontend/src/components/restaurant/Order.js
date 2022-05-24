import {Link, Navigate} from "react-router-dom";
import {useState, useEffect} from 'react';
import Meal from "./Meal";
function Order(props) {
    const [order, setOrder] = useState(props.order);

    async function deleteOrderHandler(e) {
        const res = await fetch("http://localhost:5000/order/" + order._id, {
            method: "DELETE"
        });
        props.refreshRestaurant();
    }


    return (
        <div className="container"
             style={{margin: "10px", padding: "10px", border: "solid 2px whitesmoke", borderRadius: "10px"}}>
            <div className="row">
                <div className="col-6" style={{textAlign: "left"}}>
                    {props.useFor==="user" && (<span style={{fontSize: "25px"}}>{props.restaurantName}</span>)}
                </div>
                <div className="col-6" style={{textAlign: "right"}}>
                    {props.useFor==="restaurant" && (<span style={{fontSize: "25px"}}> "ceko(TODO)" </span>)} {/*TODO*/}
                </div>
            </div>
            <Meal meal={order.meal_id}></Meal>
        </div>
    );
}

export default Order;