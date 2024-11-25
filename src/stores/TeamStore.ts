import { action, makeObservable, observable } from "mobx";

import { BaseItem } from "../models/BaseItem";
import { Team } from "../models/Team";

export class TeamStore extends BaseItem {
    @observable public teams: Team[];

    public constructor() {
        super();
        makeObservable(this);

        this.teams = [];
    }

    @action
    public deepClone(): TeamStore {
        const clone = new TeamStore();
        clone.teams = this.teams.map(team => team.deepClone());
        return clone;
    }
}