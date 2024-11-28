import { observable } from "mobx";
import { BaseItem } from "./BaseItem";

export interface ITeamSubtask {
    teamId: number;
    subtaskId: number;
}

export class TeamSubtask extends BaseItem implements ITeamSubtask {
    @observable
    public teamId: number;

    @observable
    public subtaskId: number;

    public constructor(data: ITeamSubtask) {
        super();

        this.teamId = data.teamId;
        this.subtaskId = data.subtaskId;
    }
}