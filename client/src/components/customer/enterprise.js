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

import CustomerBar from "./customerBar"

const Enterprise = (props) => {
    let [rows, setRows] = useState(null)
    const [id, setId] = useState("")
    const [address, setAddress] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [enterpriseName, setEnterpriseName] = useState("")

    useEffect(async () => {
        rows = await rowValues()
    }, [])

    const rowValues = async () => {
        let customers;
        let data = []

        await axios({method: "get", url: "/customers"})
            .then(res => customers = res.data)
            .catch(err => console.log(err))

        console.log(customers)

        customers._embedded.enterprises.map(g => {
            data.push(createData(g._links.self.href.split("/").pop(), g.address, g.phoneNumber, g.enterpriseName, g.type))
        })

        data.sort((a, b) => {
            return a.id - b.id
        })

        setRows(data)
    }

    const createData = (id, address, phoneNumber, enterpriseName, type) => {
        return {id, address, phoneNumber, enterpriseName, type}
    }

    const handleCreate = async (event) => {
        await axios({method: "POST", url: "/enterprises", data: {type: "e", address, phoneNumber, enterpriseName}})
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
    }

    const handleUpdate = async (event) => {
        await axios({method: "PUT", url: "/enterprises/" + id, data: {address, phoneNumber, enterpriseName}})
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
    }

    return (
        <Grid container justify="center" style={{background: "#FFF"}}>
            <CustomerBar/>
            <Grid item xs={6} align="center">
                <Typography variant="h5">Create an Individual Customer</Typography>
                {<form noValidate autoComplete="off">
                    <TextField label="Address" value={address} onChange={(event) => setAddress(event.target.value)}/>
                    <br/>
                    <TextField label="Phone Number" value={phoneNumber}
                               onChange={(event) => setPhoneNumber(event.target.value)}/> <br/>
                    <TextField label="Enterprise Name" value={enterpriseName}
                               onChange={(event) => setEnterpriseName(event.target.value)}/> <br/>
                    <Button color={'secondary'} variant="contained" style={{margin: "25px", width: "250px"}}
                            onClick={handleCreate}>Create</Button>
                </form>}
            </Grid>
            <Grid item xs={6} align="center">
                <Typography variant="h5">Update an Individual Customer</Typography>
                {<form noValidate autoComplete="off">
                    <TextField label="ID" value={id} onChange={(event) => setId(event.target.value)}/> <br/>
                    <TextField label="Address" value={address} onChange={(event) => setAddress(event.target.value)}/>
                    <br/>
                    <TextField label="Phone Number" value={phoneNumber}
                               onChange={(event) => setPhoneNumber(event.target.value)}/> <br/>
                    <TextField label="Enterprise Name" value={enterpriseName}
                               onChange={(event) => setEnterpriseName(event.target.value)}/> <br/>
                    <Button color={'secondary'} variant="contained" style={{margin: "25px", width: "250px"}}
                            onClick={handleUpdate}>Update</Button>
                </form>}
            </Grid>
            <Grid item xs={12} align="center">
                <TableContainer component={Paper} style={{margin: "25px 0px"}}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">ID</TableCell>
                            <TableCell align="left">Address</TableCell>
                            <TableCell align="right">PhoneNumber</TableCell>
                            <TableCell align="right">Type</TableCell>
                            <TableCell align="right">Enterprise Name</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows != null ? rows.map(row => {
                            return (
                                <TableRow key={row.id}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.address}</TableCell>
                                    <TableCell>{row.phoneNumber}</TableCell>
                                    <TableCell>{row.type}</TableCell>
                                    <TableCell>{row.enterpriseName}</TableCell>
                                </TableRow>
                            )
                        }) : null}
                    </TableBody>
                </TableContainer>
            </Grid>
        </Grid>
    )
}

export default Enterprise;