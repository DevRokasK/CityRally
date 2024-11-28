import React from "react";
import { observer } from "mobx-react-lite";
import "./TaskCard.css";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
//import DragHandleIcon from '@mui/icons-material/DragHandle';

import { Task } from "../../../models/Task";
import Checkbox from '@mui/material/Checkbox';
import { UserStore } from "../../../stores/UserStore";

export interface IEventCardProps {
    task: Task;
    showDrag: boolean;
    userStore: UserStore;
};

export const TaskCard = observer((props: IEventCardProps) => {
    const { task, /* showDrag */ userStore } = props;
    const { subtasks } = task;

    const cardContent = subtasks.map((subtask, index) => {
        const isLast = index === subtasks.length - 1;

        if (userStore.isAdmin) {
            return (
                <div
                    className="taskCardContent"
                    style={{ borderBottom: !isLast ? '1px solid rgba(0, 0, 0, 0.12)' : 'none' }}
                    key={subtask.id}
                >
                    <Typography variant="body2" component="div" className="taskCardText" style={{ fontWeight: "bold" }}>
                        {subtask.title}
                    </Typography>
                    <Typography variant="body2" className="taskCardText">
                        Points: {subtask.points}
                    </Typography>
                </div>
            );
        }

        const isChecked = userStore.teamSubtasks.some(
            (teamSubtask) => teamSubtask.subtaskId === subtask.id
        );

        const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
            if (event.target.checked) {
                const response = await userStore.addTeamSubtask(subtask.id);
                if (response) {
                    userStore.addTS(subtask.id);
                }
            } else {
                const response = await userStore.removeTeamSubtask(subtask.id);
                if (response) {
                    userStore.removeTS(subtask.id);
                }
            }
        };

        return (
            <div
                className="TeamtaskCardContent"
                style={{ borderBottom: !isLast ? '1px solid rgba(0, 0, 0, 0.12)' : 'none' }}
                key={subtask.id}
            >
                <div className="taskTextContainer">
                    <Typography variant="body2" component="div" className="taskCardText" style={{ fontWeight: "bold" }}>
                        {subtask.title}
                    </Typography>
                    <Typography variant="body2" className="taskCardText">
                        Points: {subtask.points}
                    </Typography>
                </div>
                <Checkbox
                    className="taskCheckbox"
                    checked={isChecked}
                    onChange={handleChange}
                />
            </div>
        );
    });

    const card = (
        <React.Fragment>
            <CardContent style={{ padding: 4 }} className="cardContent">
                {/* {showDrag &&
                    <div className="dragButtonContainer">
                        <DragHandleIcon className="dragIcon" />
                    </div>
                } */}
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