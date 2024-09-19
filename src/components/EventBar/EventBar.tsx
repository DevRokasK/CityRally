import { observer } from "mobx-react-lite"

import "./EventBar.css";
import { EventCard } from "../EventCard/EventCard";
import { Event } from "../../models/Event";

export interface IEventBarProps {
    title: string;
    events: Event[];
}

export const EventBar = observer((props: IEventBarProps) => {
    const { title, events } = props;

    if (events.length === 0) {
        return null;
    }

    const eventCards = events.map(event => {
        return <EventCard key={event.id} event={event} />;
    });

    return (
        <div className="eventBar">
            <p className="eventBarTitle">{title}</p>
            <div className="eventBarContent">
                {eventCards}
            </div>
        </div>
    );
});