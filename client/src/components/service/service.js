import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Grid, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";


const Service = (props) => {
    let [rows, setRows] = useState(null)

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

    return (
        <Grid container justify="center" style={{}}>
            <Grid item xs={12} align="center">
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