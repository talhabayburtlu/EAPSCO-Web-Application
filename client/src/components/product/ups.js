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

const UPS = (props) => {
    let [rows, setRows] = useState(null)
    const [id, setId] = useState("");
    const [price, setPrice] = useState("");
    const [sold, setSold] = useState("");
    const [capacity, setCapacity] = useState("");
    const [dimensions, setDimensions] = useState("");
    const [voltage, setVoltage] = useState("");

    useEffect(async () => {
        rows = await rowValues()
    }, [])

    const rowValues = async () => {
        let products;
        let data = []

        await axios({method: "get", url: "/products"})
            .then(res => products = res.data)
            .catch(err => console.log(err))

        console.log(products)

        products._embedded.upses.map(g => {
            data.push(createData(g._links.self.href.split("/").pop(), g.price, g.type, g.sold ? "True" : "False", g.capacity, g.dimensions, g.voltage))
        })


        data.sort((a, b) => {
            return a.id - b.id
        })

        setRows(data)
    }

    const createData = (id, price, type, sold, capacity, dimensions, voltage) => {
        return {id, price, type, sold, capacity, dimensions, voltage}
    }

    const handleCreate = async (event) => {
        await axios({method: "POST", url: "/upses", data: {type: "u", price, sold, capacity, dimensions, voltage}})
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
    }

    const handleUpdate = async (event) => {
        await axios({
            method: "PUT",
            url: "/upses/" + id,
            data: {price: price, sold: sold, capacity, dimensions, voltage}
        })
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
    }

    return (
        <Grid container justify="center" style={{background: "#FFF"}}>
            <ProductBar/>
            <Grid item xs={6} align="center">
                <Typography variant="h5">Create a UPS</Typography>
                {<form noValidate autoComplete="off">
                    <TextField label="Price" value={price} onChange={(event) => setPrice(event.target.value)}/> <br/>
                    <TextField label="Sold" value={sold} onChange={(event) => setSold(event.target.value)}/> <br/>
                    <TextField label="Capacity" value={capacity} onChange={(event) => setCapacity(event.target.value)}/>
                    <br/>
                    <TextField label="Dimensions" value={dimensions}
                               onChange={(event) => setDimensions(event.target.value)}/> <br/>
                    <TextField label="Voltage" value={voltage} onChange={(event) => setVoltage(event.target.value)}/>
                    <br/>
                    <Button onClick={handleCreate}>Create</Button>
                </form>}

            </Grid>
            <Grid item xs={6} align="center">
                <Typography variant="h5">Update a UPS</Typography>
                {<form noValidate autoComplete="off">
                    <TextField label="ID" value={id} onChange={(event) => setId(event.target.value)}/> <br/>
                    <TextField label="Price" value={price} onChange={(event) => setPrice(event.target.value)}/> <br/>
                    <TextField label="Sold" value={sold} onChange={(event) => setSold(event.target.value)}/> <br/>
                    <TextField label="Capacity" value={capacity} onChange={(event) => setCapacity(event.target.value)}/>
                    <br/>
                    <TextField label="Dimensions" value={dimensions}
                               onChange={(event) => setDimensions(event.target.value)}/> <br/>
                    <TextField label="Voltage" value={voltage} onChange={(event) => setVoltage(event.target.value)}/>
                    <br/>
                    <Button onClick={handleUpdate}>Update</Button>
                </form>}
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="h5">All UPSES</Typography>
                <TableContainer component={Paper} style={{margin: "25px 0px"}}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">ID</TableCell>
                            <TableCell align="left">Price</TableCell>
                            <TableCell align="right">Type</TableCell>
                            <TableCell align="right">Sold</TableCell>
                            <TableCell align="right">Capacity</TableCell>
                            <TableCell align="right">Dimensions</TableCell>
                            <TableCell align="right">Voltage</TableCell>
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
                                    <TableCell>{row.capacity}</TableCell>
                                    <TableCell>{row.dimensions}</TableCell>
                                    <TableCell>{row.voltage}</TableCell>
                                </TableRow>
                            )
                        }) : null}
                    </TableBody>
                </TableContainer>
            </Grid>
        </Grid>
    )
}

export default UPS;