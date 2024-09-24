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
    public getTeams(): Team[] {
        if (this.teams?.length > 0) {
            return this.teams;
        }

        const team1 = new Team({
            id: 0,
            title: "komanda x"
        });
        const team2 = new Team({
            id: 1,
            title: "team 1"
        });
        const team3 = new Team({
            id: 2,
            title: "team 2"
        });

        this.teams.push(team1, team2, team3);

        return this.teams;

    }
}