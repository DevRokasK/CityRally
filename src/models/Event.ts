import { action, observable, runInAction } from "mobx";
import { BaseItem } from "./BaseItem";
import { TaskStore } from "../stores/TaskStore";
import { TeamStore } from "../stores/TeamStore";
import axios from "axios";
import { EventResponse } from "../Helpers";
import { Task } from "./Task";
import { Team } from "./Team";

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
    taskStore?: TaskStore;
    teamStore?: TeamStore;
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
    @observable public taskStore: TaskStore;
    @observable public teamStore: TeamStore;
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
        this.taskStore = new TaskStore();
        this.teamStore = new TeamStore();

        if (data.teamCount) {
            this.teamCount = data.teamCount;
        }
    }

    @action
    public getStartDate() {
        return `${this.startDate.getFullYear()}-${(this.startDate.getMonth() + 1).toString().padStart(2, '0')}-${this.startDate.getDate().toString().padStart(2, '0')}`;
    }

    @action
    public getEndDate() {
        return `${this.endDate.getFullYear()}-${(this.endDate.getMonth() + 1).toString().padStart(2, '0')}-${this.endDate.getDate().toString().padStart(2, '0')}`;
    }

    @action
    public async loadData() {
        try {
            const response = await axios.get(`http://localhost:5000/api/Events/${this.id}`);
            const data: EventResponse = response.data;

            runInAction(() => {
                this.taskStore.tasks = data.tasks.map(taskData => new Task(taskData));
                this.teamStore.teams = data.teams.map(teamData => new Team(teamData));
                this.endLoading();
            });
        } catch (error) {
            console.error("Failed to fetch event data", error);
        }
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
    public setTitle(newTitle: string): void {
        this.title = newTitle;
    }

    @action
    public setDesctirption(newDescription: string): void {
        this.description = newDescription
    }

    @action
    public setStartDate(newDate: Date): void {
        this.startDate = newDate;
    }

    @action
    public setEndDate(newDate: Date): void {
        this.endDate = newDate;
    }
}