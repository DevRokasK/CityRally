import { makeObservable, observable } from "mobx";

import { BaseItem } from "../models/BaseItem";
import { Team } from "../models/Team";

export class TeamStore extends BaseItem {
    @observable public teams: Team[];

    public constructor() {
        super();
        makeObservable(this);

        this.teams = [];
    }
}