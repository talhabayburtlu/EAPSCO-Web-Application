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


const Office = (props) => {
    let [rows, setRows] = useState(null)
    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [mail, setMail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")

    useEffect(async () => {
        rows = await rowValues()
    }, [])

    const rowValues = async () => {
        let suppliers;
        let data = []

        try {
            const res = await axios({method: "get", url: "/suppliers"})
            suppliers = res.data
        } catch (e) {
            console.log(e)
        }


        await Promise.all(suppliers._embedded.suppliers.map(async g => {
            const materialDates = await getIds("/suppliers/" + g._links.self.href.split("/").pop() + "/materials", "materials")
            data.push(createData(g._links.self.href.split("/").pop(), g.name, g.address, g.mail, g.phoneNumber, materialDates))
        }))

        setRows(data)
    }

    const getIds = async (href, partialUrl) => {
        let ids = ""
        try {
            const res = await axios({method: "GET", url: href})
            res.data._embedded[partialUrl].map((d => {
                ids += d._links.self.href.split("/").pop() + ", "
            }))
        } catch (e) {
            ids = " "
        }

        return ids;
    }

    const createData = (id, name, address, mail, phoneNumber, materialDates) => {
        return {id, name, address, mail, phoneNumber, materialDates}
    }

    const handleCreate = async (event) => {
        await axios({method: "POST", url: "/suppliers", data: {name, address, mail, phoneNumber}})
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
    }

    const handleUpdate = async (event) => {
        await axios({method: "PUT", url: "/suppliers/" + id, data: {name, address, mail, phoneNumber}})
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
    }

    return (
        <Grid container justify="center" style={{background: "#FFF"}}>
            <Grid item xs={6} align="center">
                <Typography variant="h5">Create a Supplier</Typography>
                {<form noValidate autoComplete="off">
                    <TextField label="Name" value={name} onChange={(event) => setName(event.target.value)}/> <br/>
                    <TextField label="Address" value={address} onChange={(event) => setAddress(event.target.value)}/>
                    <br/>
                    <TextField label="Mail" value={mail} onChange={(event) => setMail(event.target.value)}/> <br/>
                    <TextField label="Phone Number" value={phoneNumber}
                               onChange={(event) => setPhoneNumber(event.target.value)}/> <br/>
                    <Button color={'secondary'} variant="contained" style={{margin: "25px", width: "250px"}}
                            onClick={handleCreate}>Create</Button>
                </form>}
            </Grid>
            <Grid item xs={6} align="center">
                <Typography variant="h5">Update a Supplier</Typography>
                {<form noValidate autoComplete="off">
                    <TextField label="ID" value={id} onChange={(event) => setId(event.target.value)}/> <br/>
                    <TextField label="Name" value={name} onChange={(event) => setName(event.target.value)}/> <br/>
                    <TextField label="Address" value={address} onChange={(event) => setAddress(event.target.value)}/>
                    <br/>
                    <TextField label="Mail" value={mail} onChange={(event) => setMail(event.target.value)}/> <br/>
                    <TextField label="Phone Number" value={phoneNumber}
                               onChange={(event) => setPhoneNumber(event.target.value)}/> <br/>
                    <Button color={'secondary'} variant="contained" style={{margin: "25px", width: "250px"}}
                            onClick={handleUpdate}>Update</Button>
                </form>}
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="h5">All Suppliers</Typography>
                <TableContainer component={Paper} style={{margin: "25px 0px"}}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">ID</TableCell>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">Address</TableCell>
                            <TableCell align="left">Mail</TableCell>
                            <TableCell align="right">Phone Number</TableCell>
                            <TableCell align="right">Material Dates</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows != null ? rows.map(row => {
                            return (
                                <TableRow key={row.id}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.address}</TableCell>
                                    <TableCell>{row.mail}</TableCell>
                                    <TableCell>{row.phoneNumber}</TableCell>
                                    <TableCell>{row.materialDates}</TableCell>
                                </TableRow>
                            )
                        }) : null}
                    </TableBody>
                </TableContainer>
            </Grid>
        </Grid>
    )
}

export default Office;