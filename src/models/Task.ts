import { action, observable, runInAction } from "mobx";
import { BaseItem } from "./BaseItem";
import { Subtask } from "./Subtask";

export interface ITask {
    id: number;
    isMain: boolean;
    isEnabled: boolean;
    subtasks: Subtask[];
}

export class Task extends BaseItem implements ITask {
    @observable public id: number;
    @observable public isMain: boolean;
    @observable public isEnabled: boolean;
    @observable public subtasks: Subtask[];

    public constructor(data: ITask) {
        super();

        this.id = data.id;
        this.isMain = data.isMain;
        this.isEnabled = data.isEnabled;
        this.subtasks = data.subtasks.map(subtask => new Subtask(subtask));
    }

    @action
    public setSubtasks(subtasks: Subtask[]) {
        this.subtasks = subtasks;
    }

    @action
    public removeSubtask(index: number) {
        return runInAction(() => {
            this.subtasks.splice(index, 1);
            this.setSubtasks(this.subtasks);
        });
    }
}