import { makeObservable, observable } from "mobx";
import { EventStore } from "./EventStore";
import { UserStore } from "./UserStore";

export class RootStore {
    @observable public eventStore: EventStore;
    @observable public userStore: UserStore;

    public constructor() {
        makeObservable(this);

        this.userStore = new UserStore();
        this.eventStore = new EventStore(this);
    }
}