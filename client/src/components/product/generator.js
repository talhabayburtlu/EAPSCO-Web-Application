import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Grid, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";

import ProductBar from "./productBar"

const Generator = (props) => {
    let [rows, setRows] = useState(null)

    useEffect(async () => {
        rows = await rowValues()
    }, [])

    const rowValues = async () => {
        let products;
        let data = []

        await axios({method: "get", url: "/products"})
            .then(res => products = res.data)
            .catch(err => console.log(err))

        products._embedded.generators.map(g => {
            data.push(createData(g._links.self.href.split("/").pop(), g.price, g.type, g.sold ? "True" : "False", g.dimensions, g.fuelCapacity, g.power))
        })


        data.sort((a, b) => {
            return a.id - b.id
        })

        setRows(data)
    }

    const createData = (id, price, type, sold, dimensions, fuelCapacity, power) => {
        return {id, price, type, sold, dimensions, fuelCapacity, power}
    }

    return (
        <Grid container justify="center" style={{}}>
            <ProductBar/>
            <Grid item xs={12} align="center">
                <TableContainer component={Paper} style={{margin: "25px 0px"}}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">ID</TableCell>
                            <TableCell align="left">Price</TableCell>
                            <TableCell align="right">Type</TableCell>
                            <TableCell align="right">Sold</TableCell>
                            <TableCell align="right">Dimensions</TableCell>
                            <TableCell align="right">Fuel Capacity</TableCell>
                            <TableCell align="right">Power</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows != null ? rows.map(row => {
                            return (
                                <TableRow key={row.id}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.price}</TableCell>
                                    <TableCell>{row.type}</TableCell>
                                    <TableCell>{row.sold}</TableCell>
                                    <TableCell>{row.dimensions}</TableCell>
                                    <TableCell>{row.fuelCapacity}</TableCell>
                                    <TableCell>{row.power}</TableCell>
                                </TableRow>
                            )
                        }) : null}
                    </TableBody>
                </TableContainer>
            </Grid>
        </Grid>
    )
}

export default Generator;