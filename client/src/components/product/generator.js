import React, {useEffect, useState} from 'react';
import axios from "axios";
import {
    Button,
    Grid,
    Paper,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from "@material-ui/core";

import ProductBar from "./productBar"

const Generator = (props) => {
    let [rows, setRows] = useState(null)
    const [id, setId] = useState("");
    const [price, setPrice] = useState("");
    const [sold, setSold] = useState("");
    const [dimensions, setDimensions] = useState("");
    const [fuelCapacity, setFuelCapacity] = useState("");
    const [power, setPower] = useState("");

    useEffect(async () => {
        rows = await rowValues()
    }, [])

    const rowValues = async () => {
        let products;
        let data = []

        try {
            const res = await axios({method: "get", url: "/products"})
            products = res.data
        } catch (e) {
            console.log(e)
        }

        await Promise.all(products._embedded.generators.map(async g => {
            const customerId = await getId("/products/" + g._links.self.href.split("/").pop() + "/customer")
            const officeIds = await getIds("/products/" + g._links.self.href.split("/").pop() + "/offices", "offices")
            data.push(createData(g._links.self.href.split("/").pop(), g.price, g.type, g.sold ? "True" : "False", g.dimensions, g.fuelCapacity, g.power, customerId, officeIds))
        }))

        data.sort((a, b) => {
            return a.id - b.id
        })

        setRows(data)
    }

    const getId = async (href) => {
        let id;
        try {
            const res = await axios({method: "GET", url: href})
            id = res.data._links.self.href.split("/").pop()
        } catch (e) {
            id = " "
        }

        return id;
    }

    const getIds = async (href, partialUrl) => {
        let ids = ""
        try {
            const res = await axios({method: "GET", url: href})
            res.data._embedded[partialUrl].map((d => {
                ids += d._links.self.href.split("/").pop() + " "
            }))
        } catch (e) {
            ids = " "
        }

        return ids;
    }

    const createData = (id, price, type, sold, dimensions, fuelCapacity, power, customerId, officeIds) => {
        return {id, price, type, sold, dimensions, fuelCapacity, power, customerId, officeIds}
    }

    const handleCreate = async (event) => {
        await axios({
            method: "POST",
            url: "/generators",
            data: {type: "o", price, sold, dimensions, fuelCapacity, power}
        })
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
    }

    const handleUpdate = async (event) => {
        await axios({method: "PUT", url: "/generators/" + id, data: {price, sold, dimensions, fuelCapacity, power}})
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
    }


    return (
        <Grid container justify="center" style={{background: "#FFF"}}>
            <ProductBar/>
            <Grid item xs={6} align="center">
                <Typography variant="h5">Create A Generator</Typography>
                {<form noValidate autoComplete="off">
                    <TextField label="Price" value={price} onChange={(event) => setPrice(event.target.value)}/> <br/>
                    <TextField label="Sold" value={sold} onChange={(event) => setSold(event.target.value)}/> <br/>
                    <TextField label="Dimensions" value={dimensions}
                               onChange={(event) => setDimensions(event.target.value)}/> <br/>
                    <TextField label="Fuel Capacity" value={fuelCapacity}
                               onChange={(event) => setFuelCapacity(event.target.value)}/> <br/>
                    <TextField label="Power" value={power} onChange={(event) => setPower(event.target.value)}/> <br/>
                    <Button color={'secondary'} variant="contained" style={{margin: "25px", width: "250px"}}
                            onClick={handleCreate}>Create</Button>
                </form>}

            </Grid>
            <Grid item xs={6} align="center">
                <Typography variant="h5">Update A Generator</Typography>
                {<form noValidate autoComplete="off">
                    <TextField label="ID" value={id} onChange={(event) => setId(event.target.value)}/> <br/>
                    <TextField label="Price" value={price} onChange={(event) => setPrice(event.target.value)}/> <br/>
                    <TextField label="Sold" value={sold} onChange={(event) => setSold(event.target.value)}/> <br/>
                    <TextField label="Dimensions" value={dimensions}
                               onChange={(event) => setDimensions(event.target.value)}/> <br/>
                    <TextField label="Fuel Capacity" value={fuelCapacity}
                               onChange={(event) => setFuelCapacity(event.target.value)}/> <br/>
                    <TextField label="Power" value={power} onChange={(event) => setPower(event.target.value)}/> <br/>
                    <Button color={'secondary'} variant="contained" style={{margin: "25px", width: "250px"}}
                            onClick={handleUpdate}>Update</Button>
                </form>}
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="h5">All Generators</Typography>
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
                            <TableCell align="right">Customer ID</TableCell>
                            <TableCell align="right">Office IDs</TableCell>
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
                                    <TableCell>{row.customerId}</TableCell>
                                    <TableCell>{row.officeIds}</TableCell>
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