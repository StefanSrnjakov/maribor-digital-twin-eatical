import React, {useContext, useEffect, useState} from "react";

function User(props) {

    return (
        <>
            <tr>
                <td>{props.user.name}</td>
                <td>{props.user.surname}</td>
                <td>{props.user.username}</td>
                <td>{props.user.email}</td>
                <td>{props.user.telephone}</td>
            </tr>
        </>
    )


}

export default User;