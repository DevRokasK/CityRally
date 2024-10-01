import React from 'react';

import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';

import "../styles/App.css";

import { CommandBarEvent } from '../components/CommandBar/CommandBarEvent';
import { EventStore } from '../stores/EventStore';
import { TaskBar } from '../components/Bars/TaskBar/TaskBar';
import { GuideBar } from '../components/Bars/GuideBar/GuideBar';
import { Event, EventStatus } from '../models/Event';

export interface IEventProps {
    eventStore: EventStore;
}

export const EventPage = observer((props: IEventProps) => {
    const { eventStore } = props;
    const { id } = useParams();
    let event: Event = eventStore.selectEvent(id);

    if (!!!event) {
        return null;
    }

    const { state, title, tasks, teams } = event;
    const [mainTasks, additionalTasks] = tasks.sortTasks();
    const showButtons = event.state === EventStatus.Closed ? false : true;

    return (
        <div>
            <CommandBarEvent eventStore={eventStore} event={event} />
            <div className="events">
                <TaskBar title="Main tasks" addButtonText="Add main task" tasks={mainTasks} showButtons={showButtons} />
                <TaskBar title="Additional tasks" addButtonText="Add additional task" tasks={additionalTasks} showButtons={showButtons} />
                <GuideBar title="Guides" addButtonText="Add guides" teamStore={teams} showButtons={showButtons} />
            </div>
        </div >
    );
});