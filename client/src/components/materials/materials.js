import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Grid, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";


const Material = (props) => {
    let [rows, setRows] = useState(null)

    useEffect(async () => {
        rows = await rowValues()
    }, [])

    const rowValues = async () => {
        let materials;
        let data = []

        await axios({method: "get", url: "/materials"})
            .then(res => materials = res.data)
            .catch(err => console.log(err))

        console.log(materials)

        materials._embedded.materials.map(g => {
            data.push(createData(g._links.self.href.split("/").pop(), g.type, g.amount, g.price))
        })

        setRows(data)
    }

    const createData = (id, type, amount, price) => {
        return {id, type, amount, price}
    }

    return (
        <Grid container justify="center" style={{}}>
            <Grid item xs={12} align="center">
                <TableContainer component={Paper} style={{margin: "25px 0px"}}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">ID</TableCell>
                            <TableCell align="left">Type</TableCell>
                            <TableCell align="right">Amount</TableCell>
                            <TableCell align="right">Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows != null ? rows.map(row => {
                            return (
                                <TableRow key={row.id}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.type}</TableCell>
                                    <TableCell>{row.amount}</TableCell>
                                    <TableCell>{row.price}</TableCell>
                                </TableRow>
                            )
                        }) : null}
                    </TableBody>
                </TableContainer>
            </Grid>
        </Grid>
    )
}

export default Material;