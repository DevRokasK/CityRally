import React from "react";

import { observer } from "mobx-react-lite";

import "./AddCard.css";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export interface IAddCardProps {
    title: string;
    addFunction: () => void;
};

export const AddCard = observer((props: IAddCardProps) => {
    const { title, addFunction } = props;

    const onAddClick = () => {
        addFunction();
    }

    const card = (
        <React.Fragment>
            <CardContent style={{padding: 4}}>
                <Typography variant="body2" component="div" className="addCardTitle">
                    {title}
                </Typography>
            </CardContent>
        </React.Fragment>
    );

    return (
        <div onClick={onAddClick}>
            <Box sx={{ minWidth: 440, maxWidth: 440 }} className="addCard">
                <Card variant="outlined" >{card}</Card>
            </Box >
        </div>
    );
});