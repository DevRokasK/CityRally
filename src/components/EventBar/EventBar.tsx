import { observer } from "mobx-react-lite"

import "./EventBar.css";
import { EventCard } from "../EventCard/EventCard";

export interface IEventBar {
    title: string;
    count: number;
}

export const EventBar = observer((props: IEventBar) => {
    const { title, count } = props;

    if (count === 0) {
        return null;
    }

    const eventCards = Array.from({ length: count }, (_, index) => (
        <EventCard key={index} />
    ));

    return (
        <div className="eventBar">
            <p className="eventBarTitle">{title}</p>
            <div className="eventBarContent">
                {eventCards}
            </div>
        </div>
    );
});