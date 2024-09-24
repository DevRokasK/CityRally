import { action, observable } from "mobx";
import { BaseItem } from "./BaseItem";
import { TaskStore } from "../stores/TaskStore";
import { TeamStore } from "../stores/TeamStore";

export enum EventStatus {
    New,
    Draft,
    Created,
    Started,
    Closed
}
export interface IEvent {
    id: number;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    primaryColor: string;
    secondaryColor: string;
    state: EventStatus;
    tasks: TaskStore;
    teams: TeamStore;
}

export class Event extends BaseItem implements IEvent {
    @observable public id: number;
    @observable public title: string;
    @observable public description: string;
    @observable public startDate: Date;
    @observable public endDate: Date;
    @observable public primaryColor: string;
    @observable public secondaryColor: string;
    @observable public state: EventStatus;
    @observable public tasks: TaskStore;
    @observable public teams: TeamStore;

    public constructor(data: IEvent) {
        super();

        this.id = data.id;
        this.title = data.title;
        this.description = data.description;
        this.startDate = data.startDate;
        this.endDate = data.endDate;
        this.primaryColor = data.primaryColor;
        this.secondaryColor = data.secondaryColor;
        this.state = data.state;
        this.tasks = new TaskStore();
        this.teams = new TeamStore();
    }

    @action
    public getDate() {
        return `${this.startDate.getFullYear()}-${this.startDate.getMonth()}-${this.startDate.getDate()}`;
    }

    @action
    public loadData() {
        this.tasks.getTasks();
        this.teams.getTeams();
    }
}