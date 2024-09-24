import { action, observable } from "mobx";
import { BaseItem } from "./BaseItem";
import { Guide, GuideStatus } from "./Guide";

export interface ITeam {
    id: number;
    title: string;
    guides?: Guide[];
}

export class Team extends BaseItem implements ITeam {
    @observable public id: number;
    @observable public title: string;
    @observable public guides: Guide[];

    public constructor(data: ITeam) {
        super();

        this.id = data.id;
        this.title = data.title;
        this.guides = [];

        this.getGuides();
    }

    @action
    public getGuideCount() {
        return this.guides.length;
    }

    @action
    public getGuides(): void {
        this.guides = [];

        const guide1 = new Guide({
            id: 0,
            name: "Vardenis",
            email: "vadenis@email.com",
            status: GuideStatus.Invited
        });
        const guide2 = new Guide({
            id: 0,
            name: "Pavardenis",
            email: "Pavardenis@email.com",
            status: GuideStatus.Accepted
        });
        const guide3 = new Guide({
            id: 0,
            name: "Gigachadius",
            email: "Gigachadius@email.com",
            status: GuideStatus.Declined
        });

        this.guides.push(guide1, guide2, guide3);
    }

    @action
    public deepClone(): Team {
        return new Team({
            id: this.id,
            title: this.title
        });
    }
}