import React from "react";

import { observer } from "mobx-react-lite";

import "./EventCard.css";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { Link } from "react-router-dom";
import { Event } from "../../../models/Event";
import { dateToStringHnM } from "../../../Helpers";

export interface IEventCardProps {
    event: Event;
    isAdmin: boolean;
};

export const EventCard = observer((props: IEventCardProps) => {
    const { event, isAdmin } = props;
    const { title, startDate, endDate/* , primaryColor, secondaryColor */ } = event;
    const teams = event.teamCount ? event.teamCount : event.teamStore.teams.length;

    let statusString: string = event.getStateString();

    var colors = `linear-gradient(to right, #8B1E3F, #3C153B)`;

    /* if (primaryColor) {
        colors = `linear-gradient(to right, ${primaryColor}, ${primaryColor})`;
        if (secondaryColor) {
            colors = `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`;
        }
    } */

    const startTime = dateToStringHnM(startDate);
    const endTime = dateToStringHnM(endDate);

    const card = (
        <React.Fragment>
            <CardContent style={{ padding: 16 }}>
                <Typography variant="h5" component="div" className="cardTitle">
                    {title}
                </Typography>
                <Typography variant="body2" className="cardText">
                    Start date: {event.getStartDate()}
                    <br />
                    Start time: {startTime}
                    <br />
                    End date: {event.getEndDate()}
                    <br />
                    End time: {endTime}
                </Typography>
                <Typography variant="body2" className="cartStatus">
                    Teams: {teams}
                    <br />
                    {statusString}
                </Typography>
            </CardContent>
        </React.Fragment>
    );

    if (isAdmin) {
        return (
            <Link
                to={{
                    pathname: `/Event/${event.id}`,
                    state: { event }
                } as any}
                style={{ textDecoration: "none" }}
            >
                <Box sx={{ minWidth: 440, maxWidth: 440 }} className="eventCard">
                    <Card variant="outlined" style={{ backgroundColor: "#8B1E3F", backgroundImage: colors, border: "none" }}>{card}</Card>
                </Box >
            </Link>
        );
    }

    return (
        <Link
            to={{
                pathname: `/Guide/Event/${event.id}`,
                state: { event }
            } as any}
            style={{ textDecoration: "none" }}
        >
            <Box sx={{ minWidth: 440, maxWidth: 440 }} className="eventCard">
                <Card variant="outlined" style={{ backgroundColor: "#8B1E3F", backgroundImage: colors, border: "none" }}>{card}</Card>
            </Box >
        </Link>
    );
});