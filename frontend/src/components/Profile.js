import React, { useState } from "react";

function Profile (props){

    if(props.user.type === "user") return (
        <>
            <h2>Profile</h2>
            <p><b>Name: </b>{props.user.user.name}</p>
            <p><b>Surname: </b>{props.user.user.surname}</p>
            <p><b>Email: </b>{props.user.user.email}</p>
            <p><b>Username: </b>{props.user.user.username}</p>
            <p><b>Telephone: </b>{props.user.user.telephone}</p>
            <p><b>Number of orders: </b>{props.user.user.orders.length}</p>
        </>
    );
    else if(props.user.type === "restaurant") return (
        <>
            <h2>Profile</h2>
            <p><b>Name: </b>{props.user.user.name}</p>
            <p><b>Address: </b>{props.user.user.address}</p>
            <p><b>Google rating: </b>{props.user.user.google_rating}</p>
            <p><b>Username: </b>{props.user.user.username}</p>
            <p><b>Number of meals: </b>{props.user.user.meals.length}</p>
            <p><b>Number of orders: </b>{props.user.user.orders.length}</p>
        </>
    );
    else window.location.href="/";


}

export default Profile;