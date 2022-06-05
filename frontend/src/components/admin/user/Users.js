import React, {useContext, useEffect, useState} from "react";
import {AccountContext} from "../../../AccountContext";
import User from "../user/User";

function AdminUsers() {

    const account = useContext(AccountContext).account
    if(!account.admin)
        window.location.href = "/";

    const [users, setUsers] = useState([])

    const getUsers = async function () {
        const res = await fetch("http://localhost:5000/user");
        const data = await res.json();
        setUsers(data)
    }

    useEffect(function () {
        getUsers();
    }, []);

    return (
        <>
            <h2>Users</h2>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Telephone</th>
                </tr>
                {users.map(user => (<User user={user}/>))}

            </table>



        </>
    )


}

export default AdminUsers;