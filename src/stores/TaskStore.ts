import { action, makeObservable, observable } from "mobx";
import axios from "axios";

import { BaseItem } from "../models/BaseItem";
import { Task } from "../models/Task";

export class TaskStore extends BaseItem {
    @observable public tasks: Task[];

    public constructor() {
        super();
        makeObservable(this);

        this.tasks = [];
    }

    @action
    public sortTasks(): [Task[], Task[]] {
        const mainTasks: Task[] = [];
        const additionalTasks: Task[] = [];

        this.tasks.forEach(task => {
            if (task.isMain) {
                mainTasks.push(task);
            } else {
                additionalTasks.push(task);
            }
        });

        return [mainTasks, additionalTasks];
    }

    @action
    public async createTask(eventId: number, task: Task) {
        if (!task || eventId === 0) {
            return false;
        }

        try {
            const taskData = {
                eventId: eventId,
                isMain: task.isMain,
                isEnabled: task.isEnabled,
                subtasks: task.subtasks?.map(subtask => ({
                    title: subtask.title,
                    points: subtask.points,
                    isTimed: subtask.isTimed,
                    startDate: subtask.startDate,
                    endDate: subtask.endDate,
                    taskId: task.id
                })),
            };

            const response = await axios.post("http://localhost:5000/api/Tasks", taskData);

            if (response.status === 201) {
                return true;
            } else {
                console.error("Failed to create task:", response);
                return false;
            }
        } catch (error) {
            console.error("Error creating new task:", error);
            return false;
        }
    }

    @action
    public async updateTask(eventId: number, task: Task) {
        if (!task || eventId === 0) {
            return false;
        }

        try {
            const taskData = {
                eventId: eventId,
                id: task.id,
                isMain: task.isMain,
                isEnabled: task.isEnabled,
                subtasks: task.subtasks?.map(subtask => ({
                    id: subtask.id,
                    title: subtask.title,
                    points: subtask.points,
                    isTimed: subtask.isTimed,
                    startDate: subtask.startDate,
                    endDate: subtask.endDate,
                    taskId: task.id
                })),
            };

            const response = await axios.put(`http://localhost:5000/api/Tasks/${task.id}`, taskData);

            if (response.status === 204) {
                return true;
            } else {
                console.error("Failed to update task:", response);
                return false;
            }
        } catch (error) {
            console.error("Error update task:", error);
            return false;
        }
    }

    @action async deleteTask(task: Task) {
        if (!task) {
            return false;
        }

        try {
            const response = await axios.delete(`http://localhost:5000/api/Tasks/${task.id}`);

            if (response.status === 204) {
                return true;
            } else {
                console.error("Failed to delete task:", response);
                return false;
            }
        } catch (error) {
            console.error("Error deleting new task:", error);
            return false;
        }
    }
}