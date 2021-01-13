import React from 'react';
import { AppBar, Button, Grid, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Action from "./Action";
import {Route, withRouter} from "react-router-dom";
import fire from './fire';



const useStyles = makeStyles((theme) => ({
    typographyStyles: {
        flex: 1,
        color: 'white',
        fontSize: 20,
        margin: theme.spacing(1),
    },

    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
    buttonRoot: {
        background: 'orange',
        borderRadius: 5,
        border: 5,
        height: 31,
        margin: theme.spacing(1),
      }
    
  }));

const Header = props => {
   
    const classes = useStyles();

    const handleButtonClick = pageURL => {
     
    };

    return (
    <AppBar position="static">
        <Toolbar>
            <Grid container spacing={2} direction="column">
                <Grid item xs={12} container>
                    <Grid item xs={5}>
                      <Typography className={classes.typographyStyles}>
                        Seri Bobinaj ve Serbosan Energy and Power Systems
                      </Typography>  
                    </Grid>
                    <Grid item xs={2} />
                    <Grid item xs={1}>
                        <Button onClick={() => handleButtonClick('/Action')} variant="contained" size="small" color="white" className={classes.buttonRoot}>
                        Views
                        </Button>
                    </Grid>
                    <Grid item xs={1} />
                    <Grid item xs={1}>
                        <Button  variant="contained" size="small" color="white" className={classes.buttonRoot}>
                        Procedures
                        </Button>
                    </Grid>
                    <Grid item xs={1} />
                    <Grid item xs={1}>
                        <Button  onClick={() => fire.auth().signOut()} variant="contained" size="small" color="secondary" className={classes.margin}>
                        Logout
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Toolbar>
    </AppBar>



    );
};

export default Header;