import { action, makeObservable, observable } from "mobx";
import axios from "axios";

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
    public async createTeam(eventId: number, team: Team) {
        if (!team || eventId === 0) {
            return false;
        }

        try {
            const teamData = {
                eventId: eventId,
                title: team.title,
                guides: team.guides?.map(guide => ({
                    name: guide.name,
                    email: guide.email,
                    status: guide.status,
                    teamId: team.id
                })),
            };

            const response = await axios.post("http://localhost:5000/api/Teams", teamData);

            if (response.status === 201) {
                return true;
            } else {
                console.error("Failed to create team:", response);
                return false;
            }
        } catch (error) {
            console.error("Error creating new team:", error);
            return false;
        }
    }

    @action
    public async updateTeam(eventId: number, team: Team) {
        if (!team || eventId === 0) {
            return false;
        }

        try {
            const teamData = {
                eventId: eventId,
                id: team.id,
                title: team.title,
                guides: team.guides?.map(guide => ({
                    id: guide.id,
                    name: guide.name,
                    email: guide.email,
                    status: guide.status,
                    teamId: team.id
                })),
            };

            const response = await axios.put(`http://localhost:5000/api/Teams/${team.id}`, teamData);

            if (response.status === 204) {
                return true;
            } else {
                console.error("Failed to update team:", response);
                return false;
            }
        } catch (error) {
            console.error("Error updating team:", error);
            return false;
        }
    }

    @action
    public async deleteTeam(team: Team) {
        if (!team) {
            return false;
        }

        try {
            const response = await axios.delete(`http://localhost:5000/api/Teams/${team.id}`);

            if (response.status === 204) {
                return true;
            } else {
                console.error("Failed to delete team:", response);
                return false;
            }
        } catch (error) {
            console.error("Error deleting new team:", error);
            return false;
        }
    }
}