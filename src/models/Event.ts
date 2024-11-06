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
    tasks?: TaskStore;
    teams?: TeamStore;
    teamCount?: number;
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
    @observable public teamCount: number;

    public constructor(data: IEvent) {
        super();

        this.id = data.id;
        this.title = data.title;
        this.description = data.description;
        this.startDate = new Date(data.startDate);
        this.endDate = new Date(data.endDate);
        this.primaryColor = data.primaryColor;
        this.secondaryColor = data.secondaryColor;
        this.state = data.state;

        if (data.tasks) {
            this.tasks = data.tasks;
        } else {
            this.tasks = new TaskStore();
        }

        if (data.teams) {
            this.teams = data.teams;
        } else {
            this.teams = new TeamStore();
        }

        if (this.state !== EventStatus.New) {
            this.teams.getTeams();
        }

        if (data.teamCount) {
            this.teamCount = data.teamCount;
        }
    }

    @action
    public getStartDate() {
        return `${this.startDate.getFullYear()}-${this.startDate.getMonth()}-${this.startDate.getDate()}`;
    }

    @action
    public getEndDate() {
        return `${this.endDate.getFullYear()}-${this.endDate.getMonth()}-${this.endDate.getDate()}`;
    }

    @action
    public loadData() {
        this.tasks.getTasks();
    }

    @action
    public deepClone(): Event {
        const tasks = this.tasks.deepClone();
        const teams = this.teams.deepClone();

        return new Event({
            id: this.id,
            title: this.title,
            description: this.description,
            startDate: new Date(this.startDate),
            endDate: new Date(this.endDate),
            primaryColor: this.primaryColor,
            secondaryColor: this.secondaryColor,
            state: this.state,
            tasks: tasks,
            teams: teams
        });
    }

    @action
    public getStateString(): string {
        switch (this.state) {
            case EventStatus.New: {
                return "New";
            }
            case EventStatus.Draft: {
                return "Draft";
            }
            case EventStatus.Created: {
                return "Scheduled";
            }
            case EventStatus.Started: {
                return "Ongoing";
            }
            case EventStatus.Closed: {
                return "Closed";
            }
        }
    }

    @action
    public setTitle(newTitle: string) {
        this.title = newTitle;
    }
}