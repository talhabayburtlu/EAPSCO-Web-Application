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

const Product = (props) => {
    let [rows, setRows] = useState(null);
    const [id, setId] = useState("");
    const [price, setPrice] = useState("");
    const [sold, setSold] = useState("");
    const [customerId, setcustomerId] = useState("");

    useEffect(() => {
        rows = rowValues()
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
            data.push(createData(g._links.self.href.split("/").pop(), g.price, g.type, g.sold ? "True" : "False", customerId, officeIds))
        }))

        await Promise.all(products._embedded.motors.map(async g => {
            const customerId = await getId("/products/" + g._links.self.href.split("/").pop() + "/customer")
            const officeIds = await getIds("/products/" + g._links.self.href.split("/").pop() + "/offices", "offices")
            data.push(createData(g._links.self.href.split("/").pop(), g.price, g.type, g.sold ? "True" : "False", customerId, officeIds))
        }))

        await Promise.all(products._embedded.upses.map(async g => {
            const customerId = await getId("/products/" + g._links.self.href.split("/").pop() + "/customer")
            const officeIds = await getIds("/products/" + g._links.self.href.split("/").pop() + "/offices", "offices")
            data.push(createData(g._links.self.href.split("/").pop(), g.price, g.type, g.sold ? "True" : "False", customerId, officeIds))
        }))

        await Promise.all(products._embedded.products.map(async g => {
            const customerId = await getId("/products/" + g._links.self.href.split("/").pop() + "/customer")
            const officeIds = await getIds("/products/" + g._links.self.href.split("/").pop() + "/offices", "offices")
            data.push(createData(g._links.self.href.split("/").pop(), g.price, g.type, g.sold ? "True" : "False", customerId, officeIds))
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

    const createData = (id, price, type, sold, customerId, officeIds) => {
        return {id, price, type, sold, customerId, officeIds}
    }

    const handleCreate = async (event) => {
        await axios({method: "POST", url: "/products", data: {type: "o", price: price, sold: sold}})
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
    }

    const handleUpdate = async (event) => {
        await axios({method: "PUT", url: "/products/" + id, data: {price: price, sold: sold}})
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
            const res = await axios({method: "DELETE", url: "/products/" + id})
            console.log(res)
        } catch (e) {
            console.log(e)
        }

    }

    return (
        <Grid container justify="center" style={{background: "#FFF"}}>
            <ProductBar/>
            <Grid item xs={4} align="center">
                <Typography variant="h5">Create A Product (Type: Other)</Typography>
                {<form noValidate autoComplete="off">
                    <TextField label="Price" value={price} onChange={(event) => setPrice(event.target.value)}/> <br/>
                    <TextField label="Sold" value={sold} onChange={(event) => setSold(event.target.value)}/> <br/>
                    <Button color={'secondary'} variant="contained" style={{margin: "25px", width: "250px"}}
                            onClick={handleCreate}>Create</Button>
                </form>}

            </Grid>
            <Grid item xs={4} align="center">
                <Typography variant="h5">Update A Product (Type: Other)</Typography>
                {<form noValidate autoComplete="off">
                    <TextField label="ID" value={id} onChange={(event) => setId(event.target.value)}/> <br/>
                    <TextField label="Price" value={price} onChange={(event) => setPrice(event.target.value)}/> <br/>
                    <TextField label="Sold" value={sold} onChange={(event) => setSold(event.target.value)}/> <br/>
                    <TextField label="Customer ID" value={customerId}
                               onChange={(event) => setcustomerId(event.target.value)}/> <br/>
                    <Button color={'secondary'} variant="contained" style={{margin: "25px", width: "250px"}}
                            onClick={handleUpdate}>Update</Button>
                </form>}
            </Grid>
            <Grid item xs={4} align="center">
                <Typography variant="h5">Delete A Product (Type: Other)</Typography>
                {<form noValidate autoComplete="off">
                    <TextField label="ID" value={id} onChange={(event) => setId(event.target.value)}/> <br/>
                    <Button color={'secondary'} variant="contained" style={{margin: "25px", width: "250px"}}
                            onClick={handleDelete}>Delete</Button>
                </form>}
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="h5">All Products</Typography>
                <TableContainer component={Paper} style={{margin: "25px 0px"}}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">ID</TableCell>
                            <TableCell align="left">Price</TableCell>
                            <TableCell align="right">Type</TableCell>
                            <TableCell align="right">Sold</TableCell>
                            <TableCell align="right">Customer Id</TableCell>
                            <TableCell align="right">Office Ids</TableCell>
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

export default Product;