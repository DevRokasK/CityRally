import React from "react";
import { observer } from "mobx-react-lite";

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import TextField from "@mui/material/TextField";

import { Task } from "../../models/Task";
import { Subtask } from "../../models/Subtask";
import { ColorButton, OutlinedButton } from "../BaseComponents/Buttons";

export interface ITaskModal {
    isOpen: boolean;
    onSave: () => void;
    onCreate: () => void;
    onClose: () => void;
    onTeamDelete: () => void;
    task: Task;
};

export const TaskModal = observer((props: ITaskModal) => {
    const { isOpen, onSave, onCreate, onClose, onTeamDelete, task } = props;
    const { subtasks, isMain } = task;

    const [inputKey, setInputKey] = React.useState<number>(0);
    const [modalKey, setModalKey] = React.useState<number>(50);

    const [initialSubtasks] = React.useState<Subtask[]>([...subtasks]);
    const [newTask, setNewTask] = React.useState<Subtask>(
        new Subtask({
            id: 0,
            title: "",
            points: 0,
            isTimed: false,
            startDate: new Date(),
            endDate: new Date()
        })
    );

    const onAdd = () => {
        if (newTask.title === "" || newTask.points <= 0) {
            return;
        }

        const updatedSubtasks = [...subtasks, newTask];
        task.setSubtasks(updatedSubtasks);
        setNewTask(new Subtask({
            id: 0,
            title: "",
            points: 0,
            isTimed: false,
            startDate: new Date(),
            endDate: new Date()
        }));

        setInputKey(prevKey => prevKey + 1);
    }

    const onDelete = (index: number) => {
        task.removeSubtask(index);
        setModalKey(prevKey => prevKey + 1);
    };

    const onCancel = () => {
        task.setSubtasks(initialSubtasks);
        onClose();
    };

    const onSaveTask = () => {
        onAdd();
        onSave();
    };

    const onCreateTask = () => {
        onAdd();
        onCreate();
    };

    const subtaskContent = subtasks?.map((subtask, index) => {
        return (
            <div key={index} className="timeContainer">
                <TextField
                    sx={{ width: "100%" }}
                    id="standard-basic"
                    label="Task"
                    variant="standard"
                    className='eventTitleEdit'
                    defaultValue={subtask.title}
                    onChange={(e) => subtask.setTitle(e.target.value)}
                />
                <TextField
                    sx={{ width: "12%" }}
                    id="standard-basic"
                    label="Points"
                    variant="standard"
                    className='eventTitleEdit'
                    type="number"
                    defaultValue={subtask.points}
                    onChange={(e) => subtask.setPoints(+e.target.value)}
                />
                <IconButton aria-label="delete" onClick={() => onDelete(index)}>
                    <DeleteIcon className="iconColor" />
                </IconButton>
            </div>
        );
    });

    return (
        <Modal
            open={isOpen}
            onClose={onCancel}
            key={modalKey}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className="editEventSettings">
                <div className="modalHeader">
                    {isMain ?
                        <Typography variant="h6" >Main Task information</Typography>
                        :
                        <Typography variant="h6" >Additional Task information</Typography>}
                    <div className="rightSection">
                        {task.id !== 0 &&
                            <ColorButton variant="contained" onClick={onTeamDelete}>Delete</ColorButton>
                        }
                        <IconButton aria-label="close" onClick={onCancel}>
                            <CloseIcon className="iconColor" />
                        </IconButton>
                    </div>
                </div>
                <div>
                    {subtaskContent}
                    <div className="timeContainer">
                        <TextField
                            sx={{ width: "100%" }}
                            id="standard-basic"
                            label="Task"
                            variant="standard"
                            className='eventTitleEdit'
                            defaultValue={newTask.title}
                            onChange={(e) => newTask.setTitle(e.target.value)}
                            key={inputKey}
                        />
                        <TextField
                            sx={{ width: "12%" }}
                            id="standard-basic"
                            label="Points"
                            variant="standard"
                            className='eventTitleEdit'
                            type="number"
                            defaultValue={newTask.points}
                            onChange={(e) => newTask.setPoints(+e.target.value)}
                            key={inputKey + 100}
                        />
                        <IconButton aria-label="Add" onClick={onAdd}>
                            <AddIcon className="iconColor" />
                        </IconButton>
                    </div>
                </div>
                <div className="modalFooterButtons">
                    {task.id === 0 ?
                        <ColorButton variant="contained" onClick={onCreateTask}>Create</ColorButton>
                        :
                        <ColorButton variant="contained" onClick={onSaveTask}>Save</ColorButton>
                    }
                    <OutlinedButton variant="outlined" onClick={onCancel}>Cancel</OutlinedButton>
                </div>
            </div>
        </Modal>
    );
});