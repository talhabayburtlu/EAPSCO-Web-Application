import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Grid, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";


const Office = (props) => {
    let [rows, setRows] = useState(null)

    useEffect(async () => {
        rows = await rowValues()
    }, [])

    const rowValues = async () => {
        let suppliers;
        let data = []

        await axios({method: "get", url: "/suppliers"})
            .then(res => suppliers = res.data)
            .catch(err => console.log(err))

        console.log(suppliers)

        suppliers._embedded.suppliers.map(g => {
            data.push(createData(g._links.self.href.split("/").pop(), g.name, g.address, g.mail, g.phoneNumber))
        })

        setRows(data)
    }

    const createData = (id, name, address, mail, phoneNumber) => {
        return {id, name, address, mail, phoneNumber}
    }

    return (
        <Grid container justify="center" style={{}}>
            <Grid item xs={12} align="center">
                <TableContainer component={Paper} style={{margin: "25px 0px"}}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">ID</TableCell>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">Address</TableCell>
                            <TableCell align="left">Mail</TableCell>
                            <TableCell align="right">Phone Number</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows != null ? rows.map(row => {
                            return (
                                <TableRow key={row.id}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.address}</TableCell>
                                    <TableCell>{row.mail}</TableCell>
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