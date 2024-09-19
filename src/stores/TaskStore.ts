import { makeObservable, observable } from "mobx";

import { BaseItem } from "../models/BaseItem";
import { Task } from "../models/Task";

export class TaskStore extends BaseItem {
    @observable public tasks: Task[];

    public constructor() {
        super();
        makeObservable(this);

        this.tasks = [];
    }
}