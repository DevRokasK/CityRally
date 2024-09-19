import React from "react";

import { observer } from "mobx-react-lite";

import "./EventCard.css";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { Event } from "../../models/Event";
import { Link } from "react-router-dom";

export interface IEventCardProps {
    event: Event;
};

export const EventCard = observer((props: IEventCardProps) => {
    const { event } = props;
    const { title, startDate, endDate, guides, primaryColor, secondaryColor } = event;

    var colors = `linear-gradient(to right, ${primaryColor}, ${primaryColor})`;
    if (secondaryColor) {
        colors = `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`;
    }

    const card = (
        <React.Fragment>
            <CardContent>
                <Typography variant="h5" component="div" className="cardTitle">
                    {title}
                </Typography>
                <Typography variant="body2" className="cardText">
                    Date: {event.getDate()}
                    <br />
                    Start time: {startDate.getHours()}:{startDate.getMinutes()}
                    <br />
                    Guides: {guides}
                    <br />
                    End time: {endDate.getHours()}:{endDate.getMinutes()}
                </Typography>
            </CardContent>
        </React.Fragment>
    );

    return (
        <Link
            to={{
                pathname: `/Event/${event.id}`,
                state: { event }
            } as any}
            style={{ textDecoration: "none" }}>
            <Box sx={{ minWidth: 440 }} className="eventCard">
                <Card variant="outlined" style={{ backgroundColor: primaryColor, backgroundImage: colors, border: "none" }}>{card}</Card>
            </Box >
        </Link>
    );
});