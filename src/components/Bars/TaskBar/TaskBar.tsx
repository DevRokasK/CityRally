import { observer } from "mobx-react-lite"

import "./TaskBar.css";
import { Task } from "../../../models/Task";
import { TaskCard } from "../../Cards/TaskCard/TaskCard";
import { AddCard } from "../../Cards/AddCard/AddCard";

export interface ITaskBarProps {
    title: string;
    addButtonText: string;
    tasks: Task[];
    showButtons: boolean;
}

export const TaskBar = observer((props: ITaskBarProps) => {
    const { title, addButtonText, tasks, showButtons } = props;

    if (tasks.length === 0) {
        return null;
    }

    const taskCards = tasks.map(task => {
        return <TaskCard key={task.id} task={task} showDrag={showButtons} />;
    });

    return (
        <div className="taskBar">
            <p className="taskBarTitle">{title}</p>
            <div className="taskBarContent">
                {showButtons &&
                    <AddCard title={addButtonText} addFunction={() => { }} />
                }
                {taskCards}
            </div>
        </div>
    );
});