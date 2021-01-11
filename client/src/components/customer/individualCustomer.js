import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Grid, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";

import CustomerBar from "./customerBar"

const IndividualCustomer = (props) => {
    let [rows, setRows] = useState(null)

    useEffect(async () => {
        rows = await rowValues()
    }, [])

    const rowValues = async () => {
        let customers;
        let data = []

        await axios({method: "get", url: "/customers"})
            .then(res => customers = res.data)
            .catch(err => console.log(err))

        customers._embedded.individualCustomers.map(g => {
            data.push(createData(g._links.self.href.split("/").pop(), g.address, g.phoneNumber, g.type, g.name, g.surname))
        })

        data.sort((a, b) => {
            return a.id - b.id
        })

        setRows(data)
    }

    const createData = (id, address, phoneNumber, type, name, surname) => {
        return {id, address, phoneNumber, type, name, surname,}
    }

    return (
        <Grid container justify="center" style={{}}>
            <CustomerBar/>
            <Grid item xs={12} align="center">
                <TableContainer component={Paper} style={{margin: "25px 0px"}}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">ID</TableCell>
                            <TableCell align="left">Address</TableCell>
                            <TableCell align="right">PhoneNumber</TableCell>
                            <TableCell align="right">Type</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Surname</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows != null ? rows.map(row => {
                            return (
                                <TableRow key={row.id}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.address}</TableCell>
                                    <TableCell>{row.phoneNumber}</TableCell>
                                    <TableCell>{row.type}</TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.surname}</TableCell>
                                </TableRow>
                            )
                        }) : null}
                    </TableBody>
                </TableContainer>
            </Grid>
        </Grid>
    )
}

export default IndividualCustomer;