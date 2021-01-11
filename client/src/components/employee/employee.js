import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Grid, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";


const Employee = (props) => {
    let [rows, setRows] = useState(null)

    useEffect(async () => {
        rows = await rowValues()
    }, [])

    const rowValues = async () => {
        let employees;
        let data = []

        await axios({method: "get", url: "/employees"})
            .then(res => employees = res.data)
            .catch(err => console.log(err))

        console.log(employees)

        employees._embedded.employees.map(g => {
            data.push(createData(g._links.self.href.split("/").pop(), g.name, g.surname, g.mail, g.phoneNumber, g.address, g.age, g.birthdate, g.salary))
        })

        setRows(data)
    }

    const createData = (id, name, surname, mail, phoneNumber, address, age, birthdate, salary) => {
        return {id, name, surname, mail, phoneNumber, address, age, birthdate, salary}
    }

    return (
        <Grid container justify="center" style={{}}>
            <Grid item xs={12} align="center">
                <TableContainer component={Paper} style={{margin: "25px 0px"}}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">ID</TableCell>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="right">Surname</TableCell>
                            <TableCell align="right">Mail</TableCell>
                            <TableCell align="right">Phone Number</TableCell>
                            <TableCell align="right">Address</TableCell>
                            <TableCell align="right">Age</TableCell>
                            <TableCell align="right">Birthdate</TableCell>
                            <TableCell align="right">Salary</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows != null ? rows.map(row => {
                            return (
                                <TableRow key={row.id}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.surname}</TableCell>
                                    <TableCell>{row.mail}</TableCell>
                                    <TableCell>{row.phoneNumber}</TableCell>
                                    <TableCell>{row.address}</TableCell>
                                    <TableCell>{row.age}</TableCell>
                                    <TableCell>{row.birthdate}</TableCell>
                                    <TableCell>{row.salary}</TableCell>
                                </TableRow>
                            )
                        }) : null}
                    </TableBody>
                </TableContainer>
            </Grid>
        </Grid>
    )
}

export default Employee;