import React from 'react';
import {Button, ButtonGroup, Grid} from "@material-ui/core";

const productBar = (props) => {

    return (
        <Grid item xs={12} style={{margin: "20px 200px"}}>
            <ButtonGroup fullWidth color="primary" variant="contained">
                <Button onClick={() => window.location.href = "/customers/all"}>All Customers</Button>
                <Button onClick={() => window.location.href = "/customers/individualCustomers"}>Individual
                    Customers</Button>
                <Button onClick={() => window.location.href = "/customers/enterprises"}>Enterprise</Button>
            </ButtonGroup>
        </Grid>
    )
}

export default productBar;