import * as React from 'react';
import { useState } from 'react';

import { observer } from "mobx-react-lite"

import "./TaskBar.css";

import { Task } from "../../../models/Task";
import { TaskCard } from "../../Cards/TaskCard/TaskCard";
import { AddCard } from "../../Cards/AddCard/AddCard";
import { TaskModal } from '../../Modals/TaskModal';
import { TaskStore } from '../../../stores/TaskStore';
import CircularProgress from '@mui/material/CircularProgress';
import { UserStore } from '../../../stores/UserStore';

export interface ITaskBarProps {
    title: string;
    eventId: number;
    addButtonText: string;
    taskStore: TaskStore;
    tasks: Task[];
    showButtons: boolean;
    isLoading: boolean;
    userStore: UserStore;
    onTaskCreated?: () => void;
}

export const TaskBar = observer((props: ITaskBarProps) => {
    const { title, eventId, addButtonText, tasks, taskStore, showButtons, isLoading, userStore, onTaskCreated } = props;
    const { createTask, updateTask, deleteTask } = taskStore;

    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    const handleOpen = (task: Task) => {
        setSelectedTask(task);
        setModalOpen(true);
    };

    const handleClose = () => {
        setModalOpen(false);
        setSelectedTask(null);
    };

    const handleSave = async () => {
        const success = await updateTask(eventId, selectedTask);
        if (success && onTaskCreated) {
            onTaskCreated();
        }
        handleClose();
    };

    const handleCreate = async () => {
        const success = await createTask(eventId, selectedTask);
        if (success && onTaskCreated) {
            onTaskCreated();
        }
        handleClose();
    };

    const handleDelete = async () => {
        const success = await deleteTask(selectedTask);
        if (success && onTaskCreated) {
            onTaskCreated();
        }
        handleClose();
    }

    const taskCards = tasks.map(task => {
        if (userStore.isAdmin) {
            return (
                <div onClick={() => handleOpen(task)} key={task.id}>
                    <TaskCard task={task} showDrag={showButtons} userStore={userStore} />
                </div>
            );
        }

        return (<TaskCard task={task} showDrag={showButtons} userStore={userStore} />);
    });

    return (
        <React.Fragment>
            <div className="taskBar">
                {isLoading &&
                    <div>
                        <CircularProgress color="secondary" />
                    </div>
                }
                <p className="taskBarTitle">{title}</p>
                <div className="taskBarContent">
                    {showButtons &&
                        <div onClick={() => handleOpen(new Task({ id: 0, isMain: title === "Main tasks", isEnabled: true, subtasks: [] }))}>
                            <AddCard title={addButtonText} />
                        </div>
                    }
                    {taskCards}
                </div>
            </div>
            {isModalOpen && userStore.isAdmin &&
                <TaskModal
                    isOpen={isModalOpen}
                    onSave={handleSave}
                    onCreate={handleCreate}
                    onClose={handleClose}
                    onTeamDelete={handleDelete}
                    task={selectedTask}
                />
            }
        </React.Fragment>
    );
});