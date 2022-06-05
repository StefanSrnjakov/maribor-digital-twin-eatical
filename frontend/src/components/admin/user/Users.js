import React, {useContext, useEffect, useState} from "react";
import {AccountContext} from "../../../AccountContext";
import User from "../user/User";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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
        <div className={"m-3"}>
            <h2>Users</h2>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Id</b></TableCell>
                            <TableCell align="right"><b>Name</b></TableCell>
                            <TableCell align="right"><b>Surname</b></TableCell>
                            <TableCell align="right"><b>Username</b></TableCell>
                            <TableCell align="right"><b>Email</b></TableCell>
                            <TableCell align="right"><b>Telephone</b></TableCell>
                            <TableCell align="right"><b>Edit</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map(user => (<User user={user}/>))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    )


}

export default AdminUsers;