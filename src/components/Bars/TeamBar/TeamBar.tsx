import * as React from 'react';
import { useState } from "react";

import { observer } from "mobx-react-lite"

import "./TeamBar.css";
import { AddCard } from "../../Cards/AddCard/AddCard";
import { TeamStore } from "../../../stores/TeamStore";
import { TeamCard } from "../../Cards/GuideCard/GuideCard";
import { GuideModal } from '../../Modals/TeamModal';
import { Team } from '../../../models/Team';
import CircularProgress from '@mui/material/CircularProgress';

export interface ITeamBarProps {
    title: string;
    eventId: number;
    addButtonText: string;
    teamStore: TeamStore;
    showButtons: boolean;
    isLoading: boolean;
    onTeamCreated?: () => void;
}

export const TeamBar = observer((props: ITeamBarProps) => {
    const { title, eventId, addButtonText, teamStore, showButtons, isLoading, onTeamCreated } = props;
    const { teams, createTeam, updateTeam, deleteTeam } = teamStore;

    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

    const handleOpen = (team: Team) => {
        setSelectedTeam(team);
        setModalOpen(true);
    };

    const handleClose = () => {
        setModalOpen(false);
        setSelectedTeam(null);
    };

    const handleSave = async () => {
        const success = await updateTeam(eventId, selectedTeam);
        if (success && onTeamCreated) {
            onTeamCreated();
        }
        handleClose();
    };

    const handleCreate = async () => {
        const success = await createTeam(eventId, selectedTeam);
        if (success && onTeamCreated) {
            onTeamCreated();
        }
        handleClose();
    };

    const handleDelete = async () => {
        const success = await deleteTeam(selectedTeam);
        if (success && onTeamCreated) {
            onTeamCreated();
        }
        handleClose();
    }

    const guideCards = teams.map(team => {
        return (
            <div
                key={team.id}
                onClick={() => handleOpen(team)}
            >
                <TeamCard team={team} />
            </div>
        )
    });

    return (
        <React.Fragment>
            <div className="guideBar">
                {isLoading &&
                    <div>
                        <CircularProgress color="secondary" />
                    </div>
                }
                <p className="guideBarTitle">{title}</p>
                <div className="guideBarContent">
                    {showButtons &&
                        <div onClick={() => handleOpen(new Team({ id: 0, title: "", guides: [] }))}>
                            <AddCard title={addButtonText} />
                        </div>
                    }
                    {guideCards}
                </div>
            </div>
            {isModalOpen &&
                <GuideModal
                    isOpen={isModalOpen}
                    onSave={handleSave}
                    onCreate={handleCreate}
                    onClose={handleClose}
                    onTeamDelete={handleDelete}
                    team={selectedTeam}
                />
            }
        </React.Fragment>
    );
});