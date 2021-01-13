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


const Employee = (props) => {
    let [rows, setRows] = useState(null)
    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [mail, setMail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [address, setAddress] = useState("")
    const [birthdate, setBirthDate] = useState("")
    const [salary, setSalary] = useState("")

    useEffect(async () => {
        rows = await rowValues()
    }, [])

    const rowValues = async () => {
        let employees;
        let data = []

        try {
            const res = await axios({method: "get", url: "/employees"})
            employees = res.data
        } catch (e) {
            console.log(e)
        }

        await Promise.all(employees._embedded.employees.map(async g => {
            const officeIds = await getIds("/employees/" + g._links.self.href.split("/").pop() + "/offices", "offices")
            data.push(createData(g._links.self.href.split("/").pop(), g.name, g.surname, g.mail, g.phoneNumber, g.address, g.age, g.birthdate, g.salary, officeIds))
        }))

        setRows(data)
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

    const createData = (id, name, surname, mail, phoneNumber, address, age, birthdate, salary, officeIds) => {
        return {id, name, surname, mail, phoneNumber, address, age, birthdate, salary, officeIds}
    }

    const handleCreate = async (event) => {
        await axios({
            method: "POST",
            url: "/employees",
            data: {name, surname, mail, phoneNumber, address, birthdate, salary}
        })
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
    }

    const handleUpdate = async (event) => {
        await axios({
            method: "PUT",
            url: "/employees/" + id,
            data: {name, surname, mail, phoneNumber, address, birthdate, salary}
        })
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
    }

    return (
        <Grid container justify="center" style={{background: "#FFF"}}>
            <Grid item xs={6} align="center">
                <Typography variant="h5">Create a Employee</Typography>
                {<form noValidate autoComplete="off">
                    <TextField label="Name" value={name} onChange={(event) => setName(event.target.value)}/> <br/>
                    <TextField label="Surname" value={surname} onChange={(event) => setSurname(event.target.value)}/>
                    <br/>
                    <TextField label="Mail" value={mail} onChange={(event) => setMail(event.target.value)}/> <br/>
                    <TextField label="Phone Number" value={phoneNumber}
                               onChange={(event) => setPhoneNumber(event.target.value)}/> <br/>
                    <TextField label="Address" value={address} onChange={(event) => setAddress(event.target.value)}/>
                    <br/>
                    <TextField label="Birthdate" value={birthdate}
                               onChange={(event) => setBirthDate(event.target.value)}/> <br/>
                    <TextField label="Salary" value={salary} onChange={(event) => setSalary(event.target.value)}/> <br/>
                    <Button color={'secondary'} variant="contained" style={{margin: "25px", width: "250px"}}
                            onClick={handleCreate}>Create</Button>
                </form>}
            </Grid>
            <Grid item xs={6} align="center">
                <Typography variant="h5">Update a Employee</Typography>
                {<form noValidate autoComplete="off">
                    <TextField label="ID" value={id} onChange={(event) => setId(event.target.value)}/> <br/>
                    <TextField label="Name" value={name} onChange={(event) => setName(event.target.value)}/> <br/>
                    <TextField label="Surname" value={surname} onChange={(event) => setSurname(event.target.value)}/>
                    <br/>
                    <TextField label="Mail" value={mail} onChange={(event) => setMail(event.target.value)}/> <br/>
                    <TextField label="Phone Number" value={phoneNumber}
                               onChange={(event) => setPhoneNumber(event.target.value)}/> <br/>
                    <TextField label="Address" value={address} onChange={(event) => setAddress(event.target.value)}/>
                    <br/>
                    <TextField label="Birthdate" value={birthdate}
                               onChange={(event) => setBirthDate(event.target.value)}/> <br/>
                    <TextField label="Salary" value={salary} onChange={(event) => setSalary(event.target.value)}/> <br/>
                    <Button color={'secondary'} variant="contained" style={{margin: "25px", width: "250px"}}
                            onClick={handleUpdate}>Update</Button>
                </form>}
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="h5">All Employees </Typography>
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
                            <TableCell align="right">Office IDs</TableCell>
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

export default Employee;