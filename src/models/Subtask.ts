import { action, observable } from "mobx";
import { BaseItem } from "./BaseItem";

export interface ISubtask {
    id: number;
    title: string;
    points: number;
    isTimed: boolean;
    startDate?: Date;
    endDate?: Date;
}

export class Subtask extends BaseItem implements ISubtask {
    @observable public id: number;
    @observable public title: string;
    @observable public points: number;
    @observable public isTimed: boolean;
    @observable public startDate: Date;
    @observable public endDate: Date;

    public constructor(data: ISubtask) {
        super();

        this.id = data.id;
        this.title = data.title;
        this.points = data.points;
        this.isTimed = data.isTimed;

        if (this.isTimed) {
            this.startDate = data.startDate;
            this.endDate = data.endDate;
        }
    }

    @action
    public deepClone(): Subtask {
        return new Subtask({
            id: this.id,
            title: this.title,
            points: this.points,
            isTimed: this.isTimed
        });
    }
}