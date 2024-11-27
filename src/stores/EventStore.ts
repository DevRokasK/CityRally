import { action, makeObservable, observable, runInAction } from "mobx";
import axios from "axios";

import { RootStore } from "./RootStore";
import { BaseItem } from "../models/BaseItem";
import { Event, EventStatus, IEvent } from "../models/Event";
import { EventResponse } from "../Helpers";
import { Task } from "../models/Task";
import { Team } from "../models/Team";

export class EventStore extends BaseItem {
    public rootStore: RootStore;

    @observable public events: Event[];

    @observable public selectedEvent: Event;

    public constructor(rootStore: RootStore) {
        super();
        makeObservable(this);

        this.rootStore = rootStore;
        this.events = [];
        this.selectedEvent = null;
    }

    @action
    public init() {
        this.startLoading();
        this.getEvents();
    }

    @action
    private async getEvents(): Promise<void> {
        try {
            await this.updateEventState();

            this.events = [];
            const response = await axios.get("http://localhost:5000/api/Events/summary");
            const eventsData: IEvent[] = response.data;

            runInAction(() => {
                this.events = eventsData.map(eventData => new Event(eventData));
                this.endLoading();
            });
        } catch (error) {
            console.error("Failed to fetch events", error);
        }
    }

    @action
    private async updateEventState() {
        try {
            await axios.put("http://localhost:5000/api/Events/update-state");
        } catch (error) {
            console.log("Failed to update event staate", error);
        }
    }

    @action
    public sortEvents(): [Event[], Event[], Event[]] {
        const currentEvents: Event[] = [];
        const draftEvents: Event[] = [];
        const pastEvents: Event[] = [];

        this.events.forEach(event => {
            switch (event.state) {
                case EventStatus.Created:
                case EventStatus.Started: {
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

    @action
    public setEvent(event: Event): void {
        this.selectedEvent = event;
    }

    @action
    public async selectEvent(id: string): Promise<Event> {
        this.loading = true;
        let event: Event | null = null;

        if (id === "new") {
            const now = new Date();
            const startDate = now;
            const endDate = new Date(now);
            endDate.setMonth(now.getMonth() + 1);

            event = new Event({
                id: 0,
                title: "",
                description: "",
                startDate: startDate,
                endDate: endDate,
                primaryColor: null,
                secondaryColor: null,
                state: EventStatus.New,
            });

            this.loading = false;
            return event;
        }

        try {
            const response = await axios.get(`http://localhost:5000/api/Events/${id}`);
            const data: EventResponse = response.data;

            event = new Event(data);
            event.taskStore.tasks = data.tasks.map(taskData => new Task(taskData));
            event.teamStore.teams = data.teams.map(teamData => new Team(teamData));
        } catch (error) {
            console.error("Error fetching event", error);
        }

        runInAction(() => {
            this.loading = false;
        });

        return event;
    }

    @action
    public async createEvent(eventStatus?: EventStatus): Promise<boolean> {
        if (!this.selectedEvent) {
            return false;
        }

        try {
            const eventData = {
                title: this.selectedEvent.title,
                description: this.selectedEvent.description,
                startDate: this.selectedEvent.startDate,
                endDate: this.selectedEvent.endDate,
                primaryColor: this.selectedEvent.primaryColor,
                secondaryColor: this.selectedEvent.secondaryColor,
                state: eventStatus ? eventStatus : EventStatus.Created,
                tasks: this.selectedEvent.taskStore.tasks.map(task => ({
                    isMain: task.isMain,
                    isEnabled: task.isEnabled,
                    subtasks: task.subtasks.map(subtask => ({
                        title: subtask.title,
                        points: subtask.points,
                        isTimed: subtask.isTimed,
                        startDate: subtask.startDate,
                        endDate: subtask.endDate,
                    })),
                })),
                teams: this.selectedEvent.teamStore.teams.map(team => ({
                    title: team.title,
                    guides: team.guides.map(guide => ({
                        name: guide.name,
                        email: guide.email,
                        status: guide.status,
                    })),
                })),
            };

            const response = await axios.post("http://localhost:5000/api/Events", eventData);

            if (response.status === 201) {
                const savedEvent = response.data;
                runInAction(() => {
                    this.events.push(new Event(savedEvent));
                    this.selectedEvent = null;
                });
                console.log("Event created successfully.");
                return true;
            } else {
                console.error("Failed to create event:", response);
                return false;
            }
        } catch (error) {
            console.error("Error saving new event:", error);
            return false;
        }
    }

    @action
    public async saveEvent(eventStatus?: EventStatus): Promise<boolean> {
        if (!this.selectedEvent) {
            console.error("No selected event to update.");
            return false;
        }

        try {
            const eventData = {
                title: this.selectedEvent.title,
                description: this.selectedEvent.description,
                startDate: this.selectedEvent.startDate,
                endDate: this.selectedEvent.endDate,
                primaryColor: this.selectedEvent.primaryColor,
                secondaryColor: this.selectedEvent.secondaryColor,
                state: eventStatus ? eventStatus : this.selectedEvent.state,
                tasks: this.selectedEvent.taskStore.tasks?.map(task => ({
                    id: task.id,
                    isMain: task.isMain,
                    isEnabled: task.isEnabled,
                    subtasks: task.subtasks?.map(subtask => ({
                        id: subtask.id,
                        title: subtask.title,
                        points: subtask.points,
                        isTimed: subtask.isTimed,
                        startDate: subtask.startDate,
                        endDate: subtask.endDate,
                    })),
                })),
                teams: this.selectedEvent.teamStore.teams?.map(team => ({
                    id: team.id,
                    title: team.title,
                    guides: team.guides?.map(guide => ({
                        id: guide.id,
                        name: guide.name,
                        email: guide.email,
                        status: guide.status,
                    })),
                })),
            };

            const response = await axios.put(`http://localhost:5000/api/Events/${this.selectedEvent.id}`, eventData);

            if (response.status === 204) {
                return true;
            } else {
                console.error("Failed to update event:", response);
                return false;
            }
        } catch (error) {
            console.error("Error updating new event:", error);
            return false;
        }
    }

    @action
    public async saveAsDraftEvent(createNew: boolean): Promise<boolean> {
        if (!this.selectedEvent) {
            console.error("No selected event to update.");
            return false;
        }

        if (createNew) {
            this.createEvent(EventStatus.Draft);
        } else {
            this.saveEvent(EventStatus.Draft);
        }

        return true;
    }

    @action
    public async deleteEvent(): Promise<boolean> {
        if (!this.selectedEvent) {
            console.error("No selected event to update.");
            return false;
        }

        try {
            const response = await axios.delete(`http://localhost:5000/api/Events/${this.selectedEvent.id}`);

            if (response.status === 204) {
                return true;
            } else {
                console.error("Failed to delete event:", response);
                return false;
            }
        } catch (error) {
            console.error("Error deleting event:", error);
            return false;
        }
    }

    @action
    public async updateEvent(): Promise<boolean> {
        if (!this.selectedEvent) {
            console.error("No selected event to update.");
            return false;
        }

        try {
            const response = await axios.put(`http://localhost:5000/api/Events/${this.selectedEvent.id}`, {
                title: this.selectedEvent.title,
                description: this.selectedEvent.description,
                startDate: this.selectedEvent.startDate,
                endDate: this.selectedEvent.endDate,
                primaryColor: this.selectedEvent.primaryColor,
                secondaryColor: this.selectedEvent.secondaryColor,
                state: this.selectedEvent.state,
            });

            if (response.status === 204) {
                return true;
            } else {
                console.error("Failed to update event:", response);
                return false;
            }
        } catch (error) {
            console.error("Error updating event:", error);
            return false;
        }
    }
}