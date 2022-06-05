import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import ModeEditIcon from '@mui/icons-material/ModeEdit';


function User(props) {

    return (
        <>
            <TableRow
                key={props.user._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">
                    {props.user._id}
                </TableCell>
                <TableCell align="right">{props.user.name}</TableCell>
                <TableCell align="right">{props.user.surname}</TableCell>
                <TableCell align="right">{props.user.username}</TableCell>
                <TableCell align="right">{props.user.email}</TableCell>
                <TableCell align="right">{props.user.telephone}</TableCell>
                <TableCell align="right"><Link to={"/admin/users/edit/"+props.user._id}><ModeEditIcon/>&nbsp;&nbsp;edit</Link></TableCell>
            </TableRow>
        </>
    )


}

export default User;