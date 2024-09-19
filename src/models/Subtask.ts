import { observable } from "mobx";
import { BaseItem } from "./BaseItem";

export interface ISubtask {
    id: number;
    title: string;
    puints: number;
    isTimed: boolean;
    startDate: Date;
    endDate: Date;
}

export class Subtask extends BaseItem implements ISubtask {
    @observable public id: number;
    @observable public title: string;
    @observable public puints: number;
    @observable public isTimed: boolean;
    @observable public startDate: Date;
    @observable public endDate: Date;

    public constructor(data: ISubtask) {
        super();

        this.id = data.id;
        this.title = data.title;
        this.puints = data.puints;
        this.isTimed = data.isTimed;
        this.startDate = data.startDate;
        this.endDate = data.endDate;
    }
}