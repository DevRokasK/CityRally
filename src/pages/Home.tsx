import * as React from 'react';

import { observer } from 'mobx-react-lite';

import "../styles/App.css";

import { EventStore } from '../stores/EventStore';
import { CommandBarHome } from '../components/CommandBar/CommandBarHome';
import { EventBar } from '../components/Bars/EventBar/EventBar';

export interface IHomeProps {
    eventStore: EventStore;
}

export const Home = observer((props: IHomeProps) => {
    const { eventStore } = props;

    const [currentEvents, draftEvents, pastEvents] = eventStore.sortEvents();

    return (
        <div>
            <CommandBarHome />
            <div className="events">
                <EventBar title={"Current events"} events={currentEvents} />
                <EventBar title={"Draft events"} events={draftEvents} />
                <EventBar title={"Past events"} events={pastEvents} />
            </div>
        </div>
    );
});