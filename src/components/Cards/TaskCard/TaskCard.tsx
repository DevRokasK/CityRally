import React from "react";
import { observer } from "mobx-react-lite";
import "./TaskCard.css";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DragHandleIcon from '@mui/icons-material/DragHandle';

import { Task } from "../../../models/Task";

export interface IEventCardProps {
    task: Task;
};

export const TaskCard = observer((props: IEventCardProps) => {
    const { task } = props;
    const { subtasks } = task;

    const cardContent = subtasks.map((subtask, index) => {
        const isLast = index === subtasks.length - 1;
        return (
            <div
                className="taskCardContent"
                style={{ borderBottom: !isLast ? '1px solid rgba(0, 0, 0, 0.12);' : 'none' }}
                key={index}
            >
                <Typography variant="body2" component="div" className="taskCardText" style={{ fontWeight: "bold" }}>
                    {subtask.title}
                </Typography>
                <Typography variant="body2" className="taskCardText">
                    Points: {subtask.points}
                </Typography>
            </div>
        );
    });

    const card = (
        <React.Fragment>
            <CardContent style={{ padding: 4 }} className="cardContent">
                <div className="dragButtonContainer">
                    <DragHandleIcon className="dragIcon" />
                </div>
                <div className="taskContent">
                    {cardContent}
                </div>
            </CardContent>
        </React.Fragment>
    );

    return (
        <Box sx={{ minWidth: 440, maxWidth: 440 }} className="taskCard">
            <Card variant="outlined">{card}</Card>
        </Box>
    );
});