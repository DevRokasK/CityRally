import React from 'react';

import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';

import "../styles/App.css";

import { CommandBarEvent } from '../components/CommandBar/CommandBarEvent';
import { EventStore } from '../stores/EventStore';
import { TaskBar } from '../components/Bars/TaskBar/TaskBar';
import { TeamBar } from '../components/Bars/TeamBar/TeamBar';
import { Event, EventStatus } from '../models/Event';
import CircularProgress from '@mui/material/CircularProgress';

export interface IEventProps {
    eventStore: EventStore;
}

export const EventPage = observer((props: IEventProps) => {
    const { eventStore } = props;
    const { id } = useParams();

    const [event, setEvent] = React.useState<Event | null>(null);

    const refreshEvent = async () => {
        const selectedEvent = await eventStore.selectEvent(id);
        if (selectedEvent) {
            setEvent(selectedEvent);
        }
    };

    React.useEffect(() => {
        (async () => {
            const selectedEvent = await eventStore.selectEvent(id);

            if (selectedEvent) {
                setEvent(selectedEvent);
            } else {
                console.error("No event found for ID:", id);
            }
        })();
    }, [id, eventStore]);

    if (!event) {
        return (<div>
            <CircularProgress color="secondary" />
        </div>);
    }

    eventStore.setEvent(event);
    const { taskStore, teamStore } = event;
    const [mainTasks, additionalTasks] = taskStore.sortTasks();
    const showButtons = event.state !== EventStatus.Closed;

    return (
        <div>
            <CommandBarEvent eventStore={eventStore} />
            {eventStore?.loading || event?.loading ?
                <div>
                    <CircularProgress color="secondary" />
                </div>
                :
                <div className="events">
                    <TaskBar
                        title="Main tasks"
                        addButtonText="Add main task"
                        eventId={event.id}
                        tasks={mainTasks}
                        taskStore={taskStore}
                        showButtons={showButtons}
                        isLoading={taskStore.loading}
                        onTaskCreated={refreshEvent}
                    />
                    <TaskBar
                        title="Additional tasks"
                        addButtonText="Add additional task"
                        eventId={event.id}
                        tasks={additionalTasks}
                        taskStore={taskStore}
                        showButtons={showButtons}
                        isLoading={taskStore.loading}
                        onTaskCreated={refreshEvent}
                    />
                    <TeamBar
                        title="Teams"
                        addButtonText="Add team"
                        eventId={event.id}
                        teamStore={teamStore}
                        showButtons={showButtons}
                        isLoading={teamStore.loading}
                        onTeamCreated={refreshEvent}
                    />
                </div>
            }
        </div>
    );
});