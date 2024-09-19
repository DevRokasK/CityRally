import { action, makeObservable, observable } from "mobx";

import { RootStore } from "./RootStore";
import { BaseItem } from "../models/BaseItem";
import { Event, EventStatus, IEvent } from "../models/Event";
import { TaskStore } from "./TaskStore";

export class EventStore extends BaseItem {
    public rootStore: RootStore;

    @observable public events: Event[];

    public constructor(rootStore: RootStore) {
        super();
        makeObservable(this);

        this.rootStore = rootStore;
        this.events = [];

        this.init();
    }

    @action
    private init() {
        this.startLoading();
        this.events = this.getEvents();
        this.endLoading();
    }

    @action getEvents(): Event[] {
        const mockEvents: IEvent[] = [
            {
                id: 1,
                title: "Orientacinės varžybos \"City Rally'25\"",
                description: "This is the first event",
                startDate: new Date("2025-08-27T12:30"),
                endDate: new Date("2025-08-27T17:30"),
                primaryColor: "#A78BE3",
                secondaryColor: "#D59330",
                state: EventStatus.Draft,
                tasks: new TaskStore(),
                guides: 3
            },
            {
                id: 2,
                title: "Orientacinės varžybos \"City Rally'24\"",
                description: "This is the second event",
                startDate: new Date("2024-08-27T12:30"),
                endDate: new Date("2023-08-27T17:30"),
                primaryColor: "#A78BE3",
                secondaryColor: "#D59330",
                state: EventStatus.Current,
                tasks: new TaskStore(),
                guides: 2
            },
            {
                id: 3,
                title: "Orientacinės varžybos \"City Rally'23\"",
                description: "This is the third event",
                startDate: new Date("2023-08-27T12:30"),
                endDate: new Date("2023-08-27T17:30"),
                primaryColor: "#8EA4D2",
                secondaryColor: "#6279B8",
                state: EventStatus.Closed,
                tasks: new TaskStore(),
                guides: 4
            },
            {
                id: 4,
                title: "Orientacinės varžybos \"City Rally'22\"",
                description: "This is the fourth event",
                startDate: new Date("2022-07-15T09:00"),
                endDate: new Date("2022-07-15T14:00"),
                primaryColor: "#FF5733",
                secondaryColor: "#FF5733",
                state: EventStatus.Closed,
                tasks: new TaskStore(),
                guides: 5
            },
            {
                id: 5,
                title: "Orientacinės varžybos \"City Rally'21\"",
                description: "This is the fifth event",
                startDate: new Date("2021-06-10T10:30"),
                endDate: new Date("2021-06-10T15:30"),
                primaryColor: "#FF5733",
                secondaryColor: "#FF5733",
                state: EventStatus.Closed,
                tasks: new TaskStore(),
                guides: 2
            },
            {
                id: 6,
                title: "Orientacinės varžybos \"City Rally'26\"",
                description: "This is the sixth event",
                startDate: new Date("2026-05-20T13:00"),
                endDate: new Date("2026-05-20T18:00"),
                primaryColor: "#FF5733",
                secondaryColor: "#FF5733",
                state: EventStatus.Draft,
                tasks: new TaskStore(),
                guides: 3
            },
            {
                id: 7,
                title: "Orientacinės varžybos \"City Rally'20\"",
                description: "This is the seventh event",
                startDate: new Date("2020-04-25T11:00"),
                endDate: new Date("2020-04-25T16:00"),
                primaryColor: "#FF5733",
                secondaryColor: "#FF5733",
                state: EventStatus.Closed,
                tasks: new TaskStore(),
                guides: 6
            },
            {
                id: 8,
                title: "Orientacinės varžybos \"City Rally'27\"",
                description: "This is the eighth event",
                startDate: new Date("2027-09-05T09:30"),
                endDate: new Date("2027-09-05T13:30"),
                primaryColor: "#FF5733",
                secondaryColor: "#FF5733",
                state: EventStatus.Draft,
                tasks: new TaskStore(),
                guides: 2
            },
            {
                id: 9,
                title: "Orientacinės varžybos \"City Rally'19\"",
                description: "This is the ninth event",
                startDate: new Date("2019-03-12T14:00"),
                endDate: new Date("2019-03-12T18:00"),
                primaryColor: "#FF5733",
                secondaryColor: "#FFD700",
                state: EventStatus.Closed,
                tasks: new TaskStore(),
                guides: 5
            },
            {
                id: 10,
                title: "Orientacinės varžybos",
                description: "This is the tenth event",
                startDate: new Date("2019-03-12T14:30"),
                endDate: new Date("2019-03-12T18:45"),
                primaryColor: "#FF5733",
                secondaryColor: "#FFD700",
                state: EventStatus.Closed,
                tasks: new TaskStore(),
                guides: 5
            }
        ];

        // Convert mock IEvent data into Event instances
        return mockEvents.map(eventData => new Event(eventData));
    }

    @action
    public findEvent(id: number): Event | undefined {
        return this.events.find(event => event.id === id);
    }

    @action
    public sortEvents(): [Event[], Event[], Event[]] {
        const currentEvents: Event[] = [];
        const draftEvents: Event[] = [];
        const pastEvents: Event[] = [];

        this.events.forEach(event => {
            switch (event.state) {
                case EventStatus.Current: {
                    currentEvents.push(event);
                    break;
                }
                case EventStatus.Draft: {
                    draftEvents.push(event);
                    break;
                }
                case EventStatus.Closed: {
                    pastEvents.push(event);
                    break;
                }
            }
        });

        return [currentEvents, draftEvents, pastEvents];
    }
}