import React from "react";

import { observer } from "mobx-react-lite";

import "./EventCard.css";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const card = (
    <React.Fragment>
        <CardContent>
            <Typography variant="h5" component="div" className="cardTitle">
                Orientacinės varžybos "City Rally'24"
            </Typography>
            <Typography variant="body2" className="cardText">
                Date: 2024-08-27
                <br />
                Start time: 12:30
                <br />
                Guides: 12
                <br />
                End time: 17:30
            </Typography>
        </CardContent>
    </React.Fragment>
);

export const EventCard = observer(() => {
    return (
        <Box sx={{ minWidth: 275, maxWidth: 440 }} className="eventCard">
            <Card variant="outlined" style={{ backgroundColor: "#D59330", backgroundImage: "linear-gradient(to right, #D59330, #A78BE3)", border: "none" }}>{card}</Card>
        </Box >
    );
});