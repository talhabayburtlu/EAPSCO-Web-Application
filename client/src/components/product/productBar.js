import React from 'react';
import {Button, ButtonGroup, Grid} from "@material-ui/core";

const productBar = (props) => {

    return (
        <Grid item xs={12} style={{margin: "20px 200px"}}>
            <ButtonGroup fullWidth color="primary" variant="contained">
                <Button onClick={() => window.location.href = "/products/all"}>All</Button>
                <Button onClick={() => window.location.href = "/products/generators"}>Generators</Button>
                <Button onClick={() => window.location.href = "/products/motors"}>Motors</Button>
                <Button onClick={() => window.location.href = "/products/upses"}>Upses</Button>
            </ButtonGroup>
        </Grid>
    )
}

export default productBar;