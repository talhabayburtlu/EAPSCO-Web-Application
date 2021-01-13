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


const Material = (props) => {
    let [rows, setRows] = useState(null)
    const [id, setId] = useState("")
    const [type, setType] = useState("")
    const [amount, setAmount] = useState("")
    const [price, setPrice] = useState("")

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

    const handleCreate = async (event) => {
        await axios({method: "POST", url: "/materials", data: {type, amount, price}})
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
    }

    const handleUpdate = async (event) => {
        await axios({method: "PUT", url: "/suppliers/" + id, data: {type, amount, price}})
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
    }

    return (
        <Grid container justify="center" style={{background: "#FFF"}}>
            <Grid item xs={6} align="center">
                <Typography variant="h5">Create a Supplier</Typography>
                {<form noValidate autoComplete="off">
                    <TextField label="Type" value={type} onChange={(event) => setType(event.target.value)}/> <br/>
                    <TextField label="Amount" value={amount} onChange={(event) => setAmount(event.target.value)}/> <br/>
                    <TextField label="Price" value={price} onChange={(event) => setPrice(event.target.value)}/> <br/>
                    <Button color={'secondary'} variant="contained" style={{margin: "25px", width: "250px"}}
                            onClick={handleCreate}>Create</Button>
                </form>}
            </Grid>
            <Grid item xs={6} align="center">
                <Typography variant="h5">Update a Supplier</Typography>
                {<form noValidate autoComplete="off">
                    <TextField label="ID" value={id} onChange={(event) => setId(event.target.value)}/> <br/>
                    <TextField label="Type" value={type} onChange={(event) => setType(event.target.value)}/> <br/>
                    <TextField label="Amount" value={amount} onChange={(event) => setAmount(event.target.value)}/> <br/>
                    <TextField label="Price" value={price} onChange={(event) => setPrice(event.target.value)}/> <br/>
                    <Button color={'secondary'} variant="contained" style={{margin: "25px", width: "250px"}}
                            onClick={handleUpdate}>Update</Button>
                </form>}
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="h5">All Materials</Typography>
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