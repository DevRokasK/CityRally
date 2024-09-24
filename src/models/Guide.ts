import { observable } from "mobx";
import { BaseItem } from "./BaseItem";

export enum GuideStatus {
    Invited = "Invited",
    Accepted = "Accepted",
    Declined = "Declined"
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
}