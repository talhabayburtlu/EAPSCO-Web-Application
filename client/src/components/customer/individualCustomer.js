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

const IndividualCustomer = (props) => {
    let [rows, setRows] = useState(null)
    const [id, setId] = useState("")
    const [address, setAddress] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")


    useEffect(async () => {
        rows = await rowValues()
    }, [])

    const rowValues = async () => {
        let customers;
        let data = []

        await axios({method: "get", url: "/customers"})
            .then(res => customers = res.data)
            .catch(err => console.log(err))

        customers._embedded.individualCustomers.map(g => {
            data.push(createData(g._links.self.href.split("/").pop(), g.address, g.phoneNumber, g.type, g.name, g.surname))
        })

        data.sort((a, b) => {
            return a.id - b.id
        })

        setRows(data)
    }

    const createData = (id, address, phoneNumber, type, name, surname) => {
        return {id, address, phoneNumber, type, name, surname,}
    }

    const handleCreate = async (event) => {
        await axios({
            method: "POST",
            url: "/individualCustomers",
            data: {type: "i", address, phoneNumber, name, surname}
        })
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
    }

    const handleUpdate = async (event) => {
        await axios({method: "PUT", url: "/individualCustomers/" + id, data: {address, phoneNumber, name, surname}})
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
                    <TextField label="Name" value={name} onChange={(event) => setName(event.target.value)}/> <br/>
                    <TextField label="Surname" value={surname} onChange={(event) => setSurname(event.target.value)}/>
                    <br/>
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
                    <TextField label="Name" value={name} onChange={(event) => setName(event.target.value)}/> <br/>
                    <TextField label="Surname" value={surname} onChange={(event) => setSurname(event.target.value)}/>
                    <br/>
                    <Button color={'secondary'} variant="contained" style={{margin: "25px", width: "250px"}}
                            onClick={handleUpdate}>Update</Button>
                </form>}
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="h5">All Individual Customers</Typography>
                <TableContainer component={Paper} style={{margin: "25px 0px"}}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">ID</TableCell>
                            <TableCell align="left">Address</TableCell>
                            <TableCell align="right">PhoneNumber</TableCell>
                            <TableCell align="right">Type</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Surname</TableCell>
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
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.surname}</TableCell>
                                </TableRow>
                            )
                        }) : null}
                    </TableBody>
                </TableContainer>
            </Grid>
        </Grid>
    )
}

export default IndividualCustomer;