import React from 'react';
import {BrowserRouter, Route, Switch,} from "react-router-dom";
import {Button, ButtonGroup, Grid} from "@material-ui/core";

import Product from './components/product/product';
import Generator from './components/product/generator';
import Motor from "./components/product/motor";
import UPS from "./components/product/ups";

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
                            <Button>Customers</Button>
                            <Button>Services</Button>
                            <Button>Offices</Button>
                            <Button>Employees</Button>
                            <Button>Suppliers</Button>
                            <Button>Materials</Button>
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
                        </Switch>
                    </BrowserRouter>

                </Grid>
            </section>
        </div>

    );
};

export default Action;