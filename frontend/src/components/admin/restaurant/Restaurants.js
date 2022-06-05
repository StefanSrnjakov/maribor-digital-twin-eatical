import React, {useContext, useEffect, useState} from "react";
import {AccountContext} from "../../../AccountContext";
import Restaurant from "../restaurant/Restaurant";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";

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
    <div className={"m-3"}>
        <h2>Restaurants</h2>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell><b>Id</b></TableCell>
                        <TableCell align="right"><b>Name</b></TableCell>
                        <TableCell align="right"><b>Username</b></TableCell>
                        <TableCell align="right"><b>Email</b></TableCell>
                        <TableCell align="right"><b>Address</b></TableCell>
                        <TableCell align="right"><b>Orders</b></TableCell>
                        <TableCell align="right"><b>Meals</b></TableCell>
                        <TableCell align="right"><b>Rating</b></TableCell>
                        <TableCell align="right"><b>Edit</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {restaurants.map(restaurant => (<Restaurant restaurant={restaurant}/>))}
                </TableBody>
            </Table>
        </TableContainer>

    </div>
    )


}

export default AdminRestaurants;