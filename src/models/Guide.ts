import { action, observable } from "mobx";
import { BaseItem } from "./BaseItem";

export enum GuideStatus {
    Invited,
    Accepted
}

export interface IGuide {
    id: number;
    name: string;
    email: string;
    status: GuideStatus;
}

export class Guide extends BaseItem implements IGuide {
    @observable public id: number;
    @observable public name: string;
    @observable public email: string;
    @observable public status: GuideStatus;

    public constructor(data: IGuide) {
        super();

        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
        this.status = data.status;
    }

    @action
    public setName(newName: string) {
        this.name = newName;
    }

    @action
    public setEmail(newEmail: string) {
        this.email = newEmail;
    }
}