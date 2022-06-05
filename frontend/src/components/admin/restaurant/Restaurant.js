import React, {useContext, useEffect, useState} from "react";

function Restaurant(props) {

    return (
        <>
            <tr>
                <td>{props.restaurant.name}</td>
                <td>{props.restaurant.username}</td>
                <td>{props.restaurant.email}</td>
                <td>{props.restaurant.address}</td>
                <td>{props.restaurant.orders.length}</td>
                <td>{props.restaurant.meals.length}</td>
                <td>{props.restaurant.ratings}</td>
            </tr>
        </>
    )


}

export default Restaurant;