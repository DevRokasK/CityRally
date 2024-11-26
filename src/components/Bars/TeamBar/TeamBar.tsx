import * as React from 'react';
import { useState } from "react";

import { observer } from "mobx-react-lite"

import "./TeamBar.css";
import { AddCard } from "../../Cards/AddCard/AddCard";
import { TeamStore } from "../../../stores/TeamStore";
import { TeamCard } from "../../Cards/GuideCard/GuideCard";
import { GuideModal } from '../../Modals/TeamModal';
import { Team } from '../../../models/Team';

export interface ITeamBarProps {
    title: string;
    addButtonText: string;
    teamStore: TeamStore;
    showButtons: boolean;
}

export const TeamBar = observer((props: ITeamBarProps) => {
    const { title, addButtonText, teamStore, showButtons } = props;
    const { teams } = teamStore;

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

    const handleSave = () => {

    };

    const handleCreate = () => {

    };

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
                <GuideModal isOpen={isModalOpen} onSave={handleSave} onCreate={handleCreate} onClose={handleClose} team={selectedTeam} />
            }
        </React.Fragment>
    );
});