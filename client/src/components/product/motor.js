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
    const [customerId, setcustomerId] = useState("");

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

        await Promise.all(products._embedded.motors.map(async g => {
            const customerId = await getId("/products/" + g._links.self.href.split("/").pop() + "/customer")
            const officeIds = await getIds("/products/" + g._links.self.href.split("/").pop() + "/offices", "offices")
            data.push(createData(g._links.self.href.split("/").pop(), g.price, g.type, g.sold ? "True" : "False", g.mtype, g.power, g.rpm, customerId, officeIds))
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

    const createData = (id, price, type, sold, mtype, power, rpm, customerId, officeIds) => {
        return {id, price, type, sold, mtype, power, rpm, customerId, officeIds}
    }

    const handleCreate = async (event) => {
        await axios({method: "POST", url: "/motors", data: {type: "m", price, sold, mtype, power, rpm}})
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
    }

    const handleUpdate = async (event) => {
        await axios({method: "PUT", url: "/motors/" + id, data: {price: price, sold: sold, mtype, power, rpm}})
            .then(async (res) => {
                try {
                    const resUp = await axios({
                        method: "PUT",
                        url: "/products/" + id + "/customer",
                        data: {_links: {customer: {href: "/customers/" + customerId}}}
                    })
                    console.log(resUp)
                } catch (e) {
                    console.log(e)
                }
            })
            .catch((err) => console.log(err))
    }

    const handleDelete = async (event) => {
        try {
            const res = await axios({method: "DELETE", url: "/motors/" + id})
            console.log(res)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Grid container justify="center" style={{background: "#FFF"}}>
            <ProductBar/>
            <Grid item xs={4} align="center">
                <Typography variant="h5">Create a Motor</Typography>
                {<form noValidate autoComplete="off">
                    <TextField label="Price" value={price} onChange={(event) => setPrice(event.target.value)}/> <br/>
                    <TextField label="Sold" value={sold} onChange={(event) => setSold(event.target.value)}/> <br/>
                    <TextField label="MType" value={mtype} onChange={(event) => setmType(event.target.value)}/> <br/>
                    <TextField label="Power" value={power} onChange={(event) => setPower(event.target.value)}/> <br/>
                    <TextField label="RPM" value={rpm} onChange={(event) => setRpm(event.target.value)}/> <br/>
                    <Button color={'secondary'} variant="contained" style={{margin: "25px", width: "250px"}}
                            onClick={handleCreate}>Create</Button>
                </form>}

            </Grid>
            <Grid item xs={4} align="center">
                <Typography variant="h5">Update a Motor</Typography>
                {<form noValidate autoComplete="off">
                    <TextField label="ID" value={id} onChange={(event) => setId(event.target.value)}/> <br/>
                    <TextField label="Price" value={price} onChange={(event) => setPrice(event.target.value)}/> <br/>
                    <TextField label="Sold" value={sold} onChange={(event) => setSold(event.target.value)}/> <br/>
                    <TextField label="MType" value={mtype} onChange={(event) => setmType(event.target.value)}/> <br/>
                    <TextField label="Power" value={power} onChange={(event) => setPower(event.target.value)}/> <br/>
                    <TextField label="RPM" value={rpm} onChange={(event) => setRpm(event.target.value)}/> <br/>
                    <TextField label="Customer ID" value={customerId}
                               onChange={(event) => setcustomerId(event.target.value)}/> <br/>
                    <Button color={'secondary'} variant="contained" style={{margin: "25px", width: "250px"}}
                            onClick={handleUpdate}>Update</Button>
                </form>}
            </Grid>
            <Grid item xs={4} align="center">
                <Typography variant="h5">Delete A Motor</Typography>
                {<form noValidate autoComplete="off">
                    <TextField label="ID" value={id} onChange={(event) => setId(event.target.value)}/> <br/>
                    <Button color={'secondary'} variant="contained" style={{margin: "25px", width: "250px"}}
                            onClick={handleDelete}>Delete</Button>
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
                                    <TableCell>{row.mtype}</TableCell>
                                    <TableCell>{row.power}</TableCell>
                                    <TableCell>{row.rpm}</TableCell>
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

export default Motor;