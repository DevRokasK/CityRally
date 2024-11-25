import { EventStatus } from "./models/Event";
import { ITask } from "./models/Task";
import { ITeam } from "./models/Team";

export function dateToStringHours(date: Date): string {
    return date.getHours() === 0 ? "24" : date.getHours().toString();
}

export function dateToStringMinutes(date: Date): string {
    if (date.getMinutes() < 10) {
        return "0" + date.getMinutes();
    }
    return date.getMinutes().toString();
}

export function dateToStringHnM(date: Date): string {
    return `${dateToStringHours(date)}:${dateToStringMinutes(date)}`;
}

export interface EventResponse {
    id: number;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    primaryColor: string;
    secondaryColor: string;
    state: EventStatus;
    tasks?: ITask[];
    teams?: ITeam[];
}