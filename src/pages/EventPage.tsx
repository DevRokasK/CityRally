import React from 'react';

import { observer } from 'mobx-react-lite';

import "../styles/App.css";

import { CommandBarEvent } from '../components/CommandBar/CommandBar';
import { EventStore } from '../stores/EventStore';
import { useParams } from 'react-router-dom';

export interface IEventProps {
    eventStore: EventStore;
}

export const EventPage = observer((props: IEventProps) => {
    const { eventStore } = props;
    const { id } = useParams();

    const event = eventStore.findEvent(+id);

    if (!event) {
        return null;
    }

    const { state, title } = event;

    return (
        <div>
            <CommandBarEvent eventState={state} eventTitle={title} />
        </div>
    );
});