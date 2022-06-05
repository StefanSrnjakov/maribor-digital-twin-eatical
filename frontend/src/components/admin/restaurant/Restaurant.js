import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

function Restaurant(props) {

    return (
        <>
            <TableRow
                key={props.restaurant._id}
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
            >
                <TableCell component="th" scope="row">
                    {props.restaurant._id}
                </TableCell>
                <TableCell align="right">{props.restaurant.name}</TableCell>
                <TableCell align="right">{props.restaurant.username}</TableCell>
                <TableCell align="right">{props.restaurant.email}</TableCell>
                <TableCell align="right">{props.restaurant.address}</TableCell>
                <TableCell align="right">{props.restaurant.orders.length}</TableCell>
                <TableCell align="right">{props.restaurant.meals.length}</TableCell>
                <TableCell align="right">{props.restaurant.ratings}</TableCell>
                <TableCell align="right"><Link
                    to={"/admin/restaurants/edit/" + props.restaurant._id}><ModeEditIcon/>&nbsp;&nbsp;edit</Link></TableCell>
            </TableRow>
        </>
    )


}

export default Restaurant;