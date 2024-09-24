import { observer } from "mobx-react-lite"

import "./GuideBar.css";
import { AddCard } from "../../Cards/AddCard/AddCard";
import { TeamStore } from "../../../stores/TeamStore";
import { GuideCard } from "../../Cards/GuideCard/GuideCard";

export interface IGuideBarProps {
    title: string;
    addButtonText: string;
    teamStore: TeamStore;
    showButtons: boolean;
}

export const GuideBar = observer((props: IGuideBarProps) => {
    const { title, addButtonText, teamStore, showButtons } = props;
    const { teams } = teamStore;

    const guideCards = teams.map((team) =>
        team.guides.map((guide) => (
            <GuideCard key={guide.id} guide={guide} teamName={team.title} />
        )));

    return (
        <div className="guideBar">
            <p className="guideBarTitle">{title}</p>
            <div className="guideBarContent">
                {showButtons &&
                    <AddCard title={addButtonText} addFunction={() => { }} />
                }
                {guideCards}
            </div>
        </div>
    );
});