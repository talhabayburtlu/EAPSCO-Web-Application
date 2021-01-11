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


const Service = (props) => {
    let [rows, setRows] = useState(null)
    const [id, setId] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [cost, setCost] = useState("")

    useEffect(async () => {
        rows = await rowValues()
    }, [])

    const rowValues = async () => {
        let services;
        let data = []

        await axios({method: "get", url: "/services"})
            .then(res => services = res.data)
            .catch(err => console.log(err))

        console.log(services)

        services._embedded.services.map(g => {
            data.push(createData(g._links.self.href.split("/").pop(), g.startDate, g.endDate, g.duration, g.cost))
        })

        setRows(data)
    }

    const createData = (id, startDate, endDate, duration, cost) => {
        return {id, startDate, endDate, duration, cost}
    }

    const handleCreate = async (event) => {
        await axios({method: "POST", url: "/services", data: {startDate, endDate, cost}})
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
    }

    const handleUpdate = async (event) => {
        await axios({method: "PUT", url: "/services/" + id, data: {startDate, endDate, cost}})
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
    }

    return (
        <Grid container justify="center" style={{background: "#FFF"}}>
            <Grid item xs={6} align="center">
                <Typography variant="h5">Create a Service</Typography>
                {<form noValidate autoComplete="off">
                    <TextField label="Start Date" value={startDate}
                               onChange={(event) => setStartDate(event.target.value)}/> <br/>
                    <Button onClick={handleCreate}>Create</Button>
                </form>}
            </Grid>
            <Grid item xs={6} align="center">
                <Typography variant="h5">Update a Service</Typography>
                {<form noValidate autoComplete="off">
                    <TextField label="ID" value={id} onChange={(event) => setId(event.target.value)}/> <br/>
                    <TextField label="Start Date" value={startDate}
                               onChange={(event) => setStartDate(event.target.value)}/> <br/>
                    <TextField label="EndDate" value={endDate} onChange={(event) => setEndDate(event.target.value)}/>
                    <br/>
                    <TextField label="Cost" value={cost} onChange={(event) => setCost(event.target.value)}/> <br/>
                    <Button onClick={handleUpdate}>Update</Button>
                </form>}
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="h5">All Services</Typography>
                <TableContainer component={Paper} style={{margin: "25px 0px"}}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">ID</TableCell>
                            <TableCell align="left">Start Date</TableCell>
                            <TableCell align="right">End Date</TableCell>
                            <TableCell align="right">Duration</TableCell>
                            <TableCell align="right">Cost</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows != null ? rows.map(row => {
                            return (
                                <TableRow key={row.id}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.startDate}</TableCell>
                                    <TableCell>{row.endDate}</TableCell>
                                    <TableCell>{row.duration}</TableCell>
                                    <TableCell>{row.cost}</TableCell>
                                </TableRow>
                            )
                        }) : null}
                    </TableBody>
                </TableContainer>
            </Grid>
        </Grid>
    )
}

export default Service;