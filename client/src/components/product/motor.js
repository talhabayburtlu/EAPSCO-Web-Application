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

const Motor = (props) => {
    let [rows, setRows] = useState(null);
    const [id, setId] = useState("");
    const [price, setPrice] = useState("");
    const [sold, setSold] = useState("");
    const [mtype, setmType] = useState("");
    const [power, setPower] = useState("");
    const [rpm, setRpm] = useState("");

    useEffect(async () => {
        rows = await rowValues()
    }, [])

    const rowValues = async () => {
        let products;
        let data = []

        await axios({method: "get", url: "/products"})
            .then(res => products = res.data)
            .catch(err => console.log(err))


        products._embedded.motors.map(g => {
            data.push(createData(g._links.self.href.split("/").pop(), g.price, g.type, g.sold ? "True" : "False", g.mtype, g.power, g.rpm))
        })


        data.sort((a, b) => {
            return a.id - b.id
        })

        setRows(data)
    }

    const createData = (id, price, type, sold, mtype, power, rpm) => {
        return {id, price, type, sold, mtype, power, rpm}
    }

    const handleCreate = async (event) => {
        await axios({method: "POST", url: "/motors", data: {type: "m", price, sold, mtype, power, rpm}})
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
    }

    const handleUpdate = async (event) => {
        await axios({method: "PUT", url: "/motors/" + id, data: {price: price, sold: sold, mtype, power, rpm}})
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
    }

    return (
        <Grid container justify="center" style={{background: "#FFF"}}>
            <ProductBar/>
            <Grid item xs={6} align="center">
                <Typography variant="h5">Create a Motor</Typography>
                {<form noValidate autoComplete="off">
                    <TextField label="Price" value={price} onChange={(event) => setPrice(event.target.value)}/> <br/>
                    <TextField label="Sold" value={sold} onChange={(event) => setSold(event.target.value)}/> <br/>
                    <TextField label="MType" value={mtype} onChange={(event) => setmType(event.target.value)}/> <br/>
                    <TextField label="Power" value={power} onChange={(event) => setPower(event.target.value)}/> <br/>
                    <TextField label="RPM" value={rpm} onChange={(event) => setRpm(event.target.value)}/> <br/>
                    <Button onClick={handleCreate}>Create</Button>
                </form>}

            </Grid>
            <Grid item xs={6} align="center">
                <Typography variant="h5">Update a Motor</Typography>
                {<form noValidate autoComplete="off">
                    <TextField label="ID" value={id} onChange={(event) => setId(event.target.value)}/> <br/>
                    <TextField label="Price" value={price} onChange={(event) => setPrice(event.target.value)}/> <br/>
                    <TextField label="Sold" value={sold} onChange={(event) => setSold(event.target.value)}/> <br/>
                    <TextField label="MType" value={mtype} onChange={(event) => setmType(event.target.value)}/> <br/>
                    <TextField label="Power" value={power} onChange={(event) => setPower(event.target.value)}/> <br/>
                    <TextField label="RPM" value={rpm} onChange={(event) => setRpm(event.target.value)}/> <br/>
                    <Button onClick={handleUpdate}>Update</Button>
                </form>}
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="h5">All Motors</Typography>
                <TableContainer component={Paper} style={{margin: "25px 0px"}}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">ID</TableCell>
                            <TableCell align="left">Price</TableCell>
                            <TableCell align="right">Type</TableCell>
                            <TableCell align="right">Sold</TableCell>
                            <TableCell align="right">M type</TableCell>
                            <TableCell align="right">Power</TableCell>
                            <TableCell align="right">RPM</TableCell>
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
                                    <TableCell>{row.mtype}</TableCell>
                                    <TableCell>{row.power}</TableCell>
                                    <TableCell>{row.rpm}</TableCell>
                                </TableRow>
                            )
                        }) : null}
                    </TableBody>
                </TableContainer>
            </Grid>
        </Grid>
    )
}

export default Motor;