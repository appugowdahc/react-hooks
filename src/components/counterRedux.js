import React from "react";
import "./counter.css"
import { Grid2, Button, Typography } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset } from "../redux/counterStore";


const CounterRedux = () => {
    const count = useSelector((state) => state.count)
    const dispatch = useDispatch()
    const handleDispatch = (action) => {
        switch (action) {
            case "ADD":
                dispatch(increment())
                return
            case "DECREMENT":
                return dispatch(decrement())
            case "RESET":
                return dispatch(reset())
            default:
                throw new Error(`The event not recognised`)

        }
    }
    return (
        <Grid2 className="counter-container">
            <Grid2>
                <Typography>{count}</Typography>
            </Grid2>
            <Grid2 className="button-container">
                <Grid2>
                    <Button variant="contained" onClick={()=>handleDispatch("ADD")}>
                        Increment
                    </Button>
                </Grid2>
                <Grid2>
                    <Button variant="contained" onClick={()=>handleDispatch("DECREMENT")}>
                        Decrement
                    </Button>
                </Grid2>
                <Grid2>
                    <Button variant="contained" onClick={()=>handleDispatch("RESET")}>
                        Reset
                    </Button>
                </Grid2>
            </Grid2>


        </Grid2>
    )
}

export default CounterRedux;