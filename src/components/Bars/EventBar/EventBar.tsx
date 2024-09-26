import { observer } from "mobx-react-lite"

import "./EventBar.css";
import { Event } from "../../../models/Event";
import { EventCard } from "../../Cards/EventCard/EventCard";

export interface IEventBarProps {
    title: string;
    events: Event[];
    isBorderless: boolean;
}

export const EventBar = observer((props: IEventBarProps) => {
    const { title, events, isBorderless } = props;

    if (events.length === 0) {
        return null;
    }

    const eventCards = events.map(event => {
        return <EventCard key={event.id} event={event} />;
    });

    return (
        <div className={isBorderless ? "eventBarBorderless" : "eventBar"}>
            <p className="eventBarTitle">{title}</p>
            <div className="eventBarContent">
                {eventCards}
            </div>
        </div>
    );
});