import axios from "axios";
import { action, makeObservable, observable, runInAction } from "mobx";
import { ITeamSubtask, TeamSubtask } from "../models/TeamSubtask";

export class UserStore {
    @observable public isAdmin: boolean;
    @observable public isLogedin: boolean;
    @observable public teamId: number;
    @observable public teamSubtasks: TeamSubtask[];

    public constructor() {
        makeObservable(this);

        this.isAdmin = false;
        this.isLogedin = true;
        this.teamId = 35;
        this.teamSubtasks = [];
    }

    @action
    public async getTeamSubtasks() {
        if (this.isAdmin || !this.teamId) {
            return false;
        }

        try {
            const response = await axios.get<ITeamSubtask[]>(`http://localhost:5000/api/TeamSubtask/team/${this.teamId}`);

            if (response.status === 200 && response.data) {
                runInAction(() => {
                    this.teamSubtasks.push(...response.data.map(teamSubtask => new TeamSubtask(teamSubtask)));
                });
                return true;
            } else {
                console.log("No team subtasks.");
                return false;
            }
        } catch (error) {
            console.error("Error getting team subtasks:", error);
            return false;
        }
    }

    @action
    public async addTeamSubtask(subtaskId: number) {
        if (!this.teamId || !subtaskId) {
            console.error("Invalid teamId or subtaskId");
            return;
        }

        const data = {
            subtaskId: subtaskId,
            teamId: this.teamId
        }

        try {
            const response = await axios.post(`http://localhost:5000/api/TeamSubtask`, data);

            if (response.status === 201) {
                return true;
            } else {
                console.error("Failed to add subtask");
                return false;
            }
        } catch (error) {
            console.error("Error adding subtask:", error);
            return false;
        }
    }

    @action
    public async removeTeamSubtask(subtaskId: number) {
        if (!this.teamId || !subtaskId) {
            console.error("Invalid teamId or subtaskId");
            return false;
        }

        try {
            const response = await axios.delete(`http://localhost:5000/api/TeamSubtask/${this.teamId}/${subtaskId}`);

            if (response.status === 204) {
                return true;
            } else {
                console.error("Failed to remove subtask");
                return false;
            }
        } catch (error) {
            console.error("Error removing subtask:", error);
            return false;
        }
    }

    @action
    public addTS(subtaskId: number) {
        if (!this.teamSubtasks.some(subtask => subtask.subtaskId === subtaskId)) {
            this.teamSubtasks.push(new TeamSubtask({ subtaskId: subtaskId, teamId: this.teamId }));
        }
    }

    @action
    public removeTS(subtaskId: number) {
        this.teamSubtasks = this.teamSubtasks.filter(subtask => subtask.subtaskId !== subtaskId);
    }
}