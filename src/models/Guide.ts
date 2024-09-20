import { observable } from "mobx";
import { BaseItem } from "./BaseItem";

export interface IGuide {
    id: number;
    name: string;
    email: string;
}

export class Guide extends BaseItem implements IGuide {
    @observable public id: number;
    @observable public name: string;
    @observable public email: string;

    public constructor(data: IGuide) {
        super();

        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
    }
}