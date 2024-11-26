import { action, observable, runInAction } from "mobx";
import { BaseItem } from "./BaseItem";
import { Guide } from "./Guide";

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
        this.guides = data.guides.map(guide => new Guide(guide));
    }

    @action
    public setTitle(newTitle: string) {
        this.title = newTitle;
    }

    @action
    public setGuides(guides: Guide[]) {
        this.guides = guides;
    }

    @action
    public removeGuide(index: number) {
        runInAction(() => {
            this.guides.splice(index, 1);
            this.setGuides(this.guides);
        })
    }
}