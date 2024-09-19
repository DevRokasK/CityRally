import { makeObservable, observable } from "mobx";
import { EventStore } from "./EventStore";

export class RootStore {
    @observable public eventStore: EventStore;

    public constructor() {
        makeObservable(this);

        this.eventStore = new EventStore(this);
    }
}