import { action, makeObservable, observable } from "mobx";

import { BaseItem } from "../models/BaseItem";
import { Task } from "../models/Task";
import { Subtask } from "../models/Subtask";

export class TaskStore extends BaseItem {
    @observable public tasks: Task[];

    public constructor() {
        super();
        makeObservable(this);

        this.tasks = [];
    }

    @action
    public getTasks(): Task[] {
        this.tasks = [];

        const subtasks: Subtask[] = this.getSubtasks();
        const task1 = new Task(
            {
                id: 0,
                isMain: true,
                isEnabled: true,
                subtasks: subtasks
            });
        const task2 = new Task(
            {
                id: 1,
                isMain: false,
                isEnabled: true,
                subtasks: subtasks
            });
        const task3 = new Task(
            {
                id: 2,
                isMain: true,
                isEnabled: true,
                subtasks: subtasks
            });

        this.tasks.push(task1, task2, task3);

        return this.tasks;

    }

    @action
    private getSubtasks(): Subtask[] {
        return [
            new Subtask(
                {
                    id: 0,
                    title: "Visai komandai nusifotografuoti pašokus ore",
                    points: 10,
                    isTimed: false
                }),
            new Subtask(
                {
                    id: 1,
                    title: "Visai komandai nusifotografuoti pašokus oreaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                    points: 5,
                    isTimed: false
                })
        ];
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
}