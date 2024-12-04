import axios from "axios";
import { action, makeObservable, observable, runInAction } from "mobx";
import { ITeamSubtask, TeamSubtask } from "../models/TeamSubtask";

const APIVersion = "2.0";

export class UserStore {
    @observable public isAdmin: boolean;
    @observable public isLogedin: boolean;
    @observable public teamId: number;
    @observable public teamSubtasks: TeamSubtask[];

    public constructor() {
        makeObservable(this);

        this.isAdmin = false;
        this.isLogedin = false;
        this.teamId = 0;
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

    @action
    public async login(email: string, password: string, userType: string) {
        if (!email) {
            console.error("Enter email");
            return false;
        }

        const loginBody = {
            userType: userType,
            email: email,
            password: password
        }

        try {
            const response = await axios.post(`http://localhost:5000/api/v:${APIVersion}/LoginV${APIVersion}`, loginBody);

            if (response.status === 200) {
                this.loginUser(response.data.userType, response.data.teamId);
                return true;
            } else {
                console.error("Failed to login");
                return false;
            }
        } catch (error) {
            console.error("Error logging in", error);
            return false;
        }
    }

    @action
    public loginUser(userType: string, teamId?: number) {
        if (userType === "Admin") {
            this.isAdmin = true;
        } else {
            this.isAdmin = false;
            this.teamId = teamId;
        }

        this.isLogedin = true;
    }

    @action
    public async resetPassword(email: string, oldPassword: string, newPassword: string) {
        if (!email || !oldPassword || !newPassword) {
            return false;
        }

        const loginBody = {
            email: email,
            oldPassword: oldPassword,
            newPassword: newPassword
        }

        try {
            const response = await axios.put(`http://localhost:5000/api/v:${APIVersion}/LoginV${APIVersion}/ChangePassword`, loginBody);

            if (response.status === 200) {
                return true;
            } else {
                console.error("Failed to change passord");
                return false;
            }
        } catch (error) {
            console.error("Error changing password", error);
            return false;
        }
    }

    @action
    public async addAdmin(name: string, email: string, password: string, inviteKey: string) {
        if (!name || !email || !password || !inviteKey) {
            return false;
        }

        const loginBody = {
            id: 0,
            name: name,
            email: email,
            password: password,
            addKey: inviteKey
        }

        try {
            const response = await axios.post(`http://localhost:5000/api/v:${APIVersion}/LoginV${APIVersion}/AddAdmin`, loginBody);

            if (response.status === 200) {
                return true;
            } else {
                console.error("Failed to add a new admin");
                return false;
            }
        } catch (error) {
            console.error("Error adding a new admin", error);
            return false;
        }
    }
}