import React, {useState} from 'react';
import Meal from "./Meal";
import Moment from 'moment'
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

function Order(props) {
    const [order, setOrder] = useState(props.order);
    const promenliva = "";
    async function handleOrder(e) {

        const data = {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': JSON.parse(localStorage.getItem('account')).token
            }
        }
        await fetch("http://localhost:5000/order/claim/"+ order._id, data);
        props.refreshRestaurant();
    }


    return (
        <div className="container"
             style={{margin: "10px", padding: "10px", border: "solid 2px whitesmoke", borderRadius: "10px"}}>
            <div className="row">
                <div className="col-6" style={{textAlign: "left"}}>
                    {props.useFor === "user" && (<span style={{fontSize: "25px"}}>{props.restaurantName}</span>)}
                </div>
                <div className="col-6" style={{textAlign: "right"}}>
                    {props.useFor === "restaurant" && (<span
                        style={{fontSize: "25px"}}> {props.isCompleted === "true" && props.order.user_id.name} </span>)}
                </div>
            </div>
            <Meal meal={order.meal_id}></Meal>
            <div className="row">
                <div className="col-6" style={{textAlign: "left"}}>

                    <span>Pick-up time:</span>
                    <span className="badge" style={{
                        backgroundColor: "rgba(255, 0, 0, 0.6)",
                        marginLeft: "10px"
                    }}>{Moment(order.pick_up_time).format('MMMM Do YYYY, h:mm a')}</span>
                    <br/>
                    <span>Order before:</span>
                    <span className="badge" style={{
                        backgroundColor: "rgba(255, 0, 0, 0.6)",
                        marginLeft: "10px"
                    }}>{Moment(order.order_time).format('MMMM Do YYYY, h:mm a')}</span>
                </div>
                {
                    props.toCreate &&
                    <div className="col-6" style={{textAlign: "right"}}>
                        <IconButton onClick={handleOrder} size="large" color="primary" aria-label="add to shopping cart">
                            <AddShoppingCartIcon fontSize="inherit" />
                        </IconButton>
                    </div>
                }
            </div>
        </div>
    );
}

export default Order;