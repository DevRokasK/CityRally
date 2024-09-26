import React from "react";

import { observer } from "mobx-react-lite";

import "./AddCard.css";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export interface IAddCardProps {
    title: string;
};

export const AddCard = observer((props: IAddCardProps) => {
    const { title } = props;

    const card = (
        <React.Fragment>
            <CardContent style={{ padding: 4 }}>
                <Typography variant="body2" component="div" className="addCardTitle">
                    {title}
                </Typography>
            </CardContent>
        </React.Fragment>
    );

    return (
        <Box sx={{ minWidth: 440, maxWidth: 440 }} className="addCard">
            <Card variant="outlined" >{card}</Card>
        </Box >
    );
});