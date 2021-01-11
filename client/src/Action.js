import React from 'react';
import {Router, BrowserRouter, Route, Switch,} from "react-router-dom";
import {Button, ButtonGroup, Grid} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Header from './Header';


import Product from './components/product/product';
import Generator from './components/product/generator';
import Motor from "./components/product/motor";
import UPS from "./components/product/ups";

const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: theme.spacing(32),
        height: theme.spacing(16)
      }
     
    },
    coloredPaper: {
      backgroundColor: "primary",
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
      color: 'primary',
      height: 480,
      width: 1000,
      padding: '0 30px',
      flex: 1
    },

    gridBox: {
        minHeight: 500,
        

    }
  }));

const Action = props => {
    const classes = useStyles();

    return (
        <div>
            <section className="action">
            <Grid>
                <BrowserRouter>
                    <Header />
                </BrowserRouter>
                


                
            </Grid>

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