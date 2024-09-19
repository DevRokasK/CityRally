import { observable } from "mobx";
import { BaseItem } from "./BaseItem";
import { Subtask } from "./Subtask";

export interface ITask {
    id: number;
    title: string;
    isMain: boolean;
    isEnabled: boolean;
    subtasks: Subtask[];
}

export class Task extends BaseItem implements ITask {
    @observable public id: number;
    @observable public title: string;
    @observable public isMain: boolean;
    @observable public isEnabled: boolean;
    @observable public subtasks: Subtask[];

    public constructor(data: ITask) {
        super();

        this.id = data.id;
        this.title = data.title;
        this.isMain = data.isMain;
        this.isEnabled = data.isEnabled;
        this.subtasks = data.subtasks;
    }
}