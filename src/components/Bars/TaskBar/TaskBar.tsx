import * as React from 'react';
import { useState } from 'react';

import { observer } from "mobx-react-lite"

import "./TaskBar.css";

import { Task } from "../../../models/Task";
import { TaskCard } from "../../Cards/TaskCard/TaskCard";
import { AddCard } from "../../Cards/AddCard/AddCard";
import { TaskModal } from '../../Modals/TaskModal';

export interface ITaskBarProps {
    title: string;
    addButtonText: string;
    tasks: Task[];
    showButtons: boolean;
}

export const TaskBar = observer((props: ITaskBarProps) => {
    const { title, addButtonText, tasks, showButtons } = props;

    const [isModalOpen, setModalOpen] = useState(false);
    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);

    const taskCards = tasks.map(task => {
        return (
            <div onClick={handleOpen}>
                <TaskCard key={task.id} task={task} showDrag={showButtons} />
            </div>
        )
    });

    return (
        <React.Fragment>
            <div className="taskBar">
                <p className="taskBarTitle">{title}</p>
                <div className="taskBarContent">
                    {showButtons &&
                        <div onClick={handleOpen}>
                            <AddCard title={addButtonText} />
                        </div>
                    }
                    {taskCards}
                </div>
            </div>
            {isModalOpen &&
                <TaskModal isOpen={isModalOpen} onClose={handleClose} />
            }
        </React.Fragment>
    );
});