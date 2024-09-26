import * as React from 'react';
import { useState } from "react";

import { observer } from "mobx-react-lite"

import "./GuideBar.css";
import { AddCard } from "../../Cards/AddCard/AddCard";
import { TeamStore } from "../../../stores/TeamStore";
import { GuideCard } from "../../Cards/GuideCard/GuideCard";
import { GuideModal } from '../../Modals/GuideModal';

export interface IGuideBarProps {
    title: string;
    addButtonText: string;
    teamStore: TeamStore;
    showButtons: boolean;
}

export const GuideBar = observer((props: IGuideBarProps) => {
    const { title, addButtonText, teamStore, showButtons } = props;
    const { teams } = teamStore;

    const [isModalOpen, setModalOpen] = useState(false);
    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);

    const guideCards = teams.map((team, index) =>
        <div
            key={team.id}
            className={index === teams.length - 1 ? "" : "teamSeperator"}
        >
            {team.guides
                .sort((a, b) => b.status - a.status)
                .map((guide) => (
                    <div key={guide.id} onClick={handleOpen}>
                        <GuideCard guide={guide} teamName={team.title} />
                    </div>
                ))}
        </div>
    );

    return (
        <React.Fragment>
            <div className="guideBar">
                <p className="guideBarTitle">{title}</p>
                <div className="guideBarContent">
                    {showButtons &&
                        <div onClick={handleOpen}>
                            <AddCard title={addButtonText} />
                        </div>
                    }
                    {guideCards}
                </div>
            </div>
            {isModalOpen &&
                <GuideModal isOpen={isModalOpen} onClose={handleClose} />
            }
        </React.Fragment>
    );
});