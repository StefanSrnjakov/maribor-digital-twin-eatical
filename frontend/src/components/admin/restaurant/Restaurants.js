import React, {useContext, useEffect, useState} from "react";
import {AccountContext} from "../../../AccountContext";
import Restaurant from "../restaurant/Restaurant";

function AdminRestaurants() {

    const account = useContext(AccountContext).account
    if(!account.admin)
        window.location.href = "/";

    const [restaurants, setRestaurants] = useState([])

    const getRestaurants = async function () {
        const res = await fetch("http://localhost:5000/restaurant");
        const data = await res.json();
        setRestaurants(data)
    }

    useEffect(function () {
        getRestaurants();
    }, []);

    return (
        <>
            <h2>Restaurants</h2>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Orders</th>
                    <th>Meals</th>
                    <th>Rating</th>
                </tr>
                {restaurants.map(restaurant => (<Restaurant restaurant={restaurant}/>))}

            </table>



        </>
    )


}

export default AdminRestaurants;