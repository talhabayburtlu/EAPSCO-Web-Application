import React from 'react';
import {BrowserRouter, Route, Switch,} from "react-router-dom";
import {Button, ButtonGroup, Grid} from "@material-ui/core";

import Product from './components/product/product';
import Generator from './components/product/generator';
import Motor from "./components/product/motor";
import UPS from "./components/product/ups";
import Customer from "./components/customer/customer";
import IndividualCustomers from "./components/customer/individualCustomer";
import Enterprise from "./components/customer/enterprise";
import Employee from "./components/employee/employee";
import Office from "./components/office/offices";
import Service from "./components/service/service";
import Supplier from "./components/supplier/supplier";
import Material from "./components/materials/materials";

const Action = ({handleLogout}) => {
    return (
        <div>
            <section className="action">
                <nav>
                    <h2>
                        Seri Bobinaj Ve Serbosan Energy and Power Systems
                    </h2>
                    <button onClick={handleLogout}>
                        Logout
                    </button>
                </nav>

                <Grid container justify="center" style={{marginTop: "10px"}}>
                    <Grid item xs={12} style={{margin: "20px 50px"}}>
                        <ButtonGroup fullWidth color="primary" variant="contained">
                            <Button onClick={() => window.location.href = "/products/all"}>Products</Button>
                            <Button onClick={() => window.location.href = "/customers/all"}>Customers</Button>
                            <Button onClick={() => window.location.href = "/services"}>Services</Button>
                            <Button onClick={() => window.location.href = "/offices"}>Offices</Button>
                            <Button onClick={() => window.location.href = "/employees"}>Employees</Button>
                            <Button onClick={() => window.location.href = "/suppliers"}>Suppliers</Button>
                            <Button onClick={() => window.location.href = "/materials"}>Materials</Button>
                        </ButtonGroup>
                    </Grid>
                    {/*<Grid item xs={12} align="center" style={{margin: "20px 50px", background: "#666" , height:"500px"}}>
                        <Product />
                    </Grid>*/}
                    <BrowserRouter>
                        <Switch>
                            <Route exact path="/products/all" component={Product}/>
                            <Route exact path="/products/generators" component={Generator}/>
                            <Route exact path="/products/motors" component={Motor}/>
                            <Route exact path="/products/upses" component={UPS}/>
                            <Route exact path="/customers/all" component={Customer}/>
                            <Route exact path="/customers/individualCustomers" component={IndividualCustomers}/>
                            <Route exact path="/customers/enterprises" component={Enterprise}/>
                            <Route exact path="/services" component={Service}/>
                            <Route exact path="/employees" component={Employee}/>
                            <Route exact path="/offices" component={Office}/>
                            <Route exact path="/suppliers" component={Supplier}/>
                            <Route exact path="/materials" component={Material}/>
                        </Switch>
                    </BrowserRouter>

                </Grid>
            </section>
        </div>

    );
};

export default Action;