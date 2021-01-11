import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Grid, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";


const Office = (props) => {
    let [rows, setRows] = useState(null)

    useEffect(async () => {
        rows = await rowValues()
    }, [])

    const rowValues = async () => {
        let offices;
        let data = []

        await axios({method: "get", url: "/offices"})
            .then(res => offices = res.data)
            .catch(err => console.log(err))

        console.log(offices)

        offices._embedded.offices.map(g => {
            data.push(createData(g._links.self.href.split("/").pop(), g.address, g.phoneNumber))
        })

        setRows(data)
    }

    const createData = (id, address, phoneNumber) => {
        return {id, address, phoneNumber}
    }

    return (
        <Grid container justify="center" style={{}}>
            <Grid item xs={12} align="center">
                <TableContainer component={Paper} style={{margin: "25px 0px"}}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">ID</TableCell>
                            <TableCell align="left">Address</TableCell>
                            <TableCell align="right">Phone Number</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows != null ? rows.map(row => {
                            return (
                                <TableRow key={row.id}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.address}</TableCell>
                                    <TableCell>{row.phoneNumber}</TableCell>
                                </TableRow>
                            )
                        }) : null}
                    </TableBody>
                </TableContainer>
            </Grid>
        </Grid>
    )
}

export default Office;