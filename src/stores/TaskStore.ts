import { action, makeObservable, observable } from "mobx";

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
    public deepClone(): TaskStore {
        const clone = new TaskStore();
        clone.tasks = this.tasks.map(task => task.deepClone());
        return clone;
    }
}