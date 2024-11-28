import * as React from 'react';

import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';

import "../styles/App.css";

import CircularProgress from '@mui/material/CircularProgress';

import { EventStore } from '../stores/EventStore';
import { TaskBar } from '../components/Bars/TaskBar/TaskBar';
import { Event, EventStatus } from '../models/Event';
import { CommandBarTeamEvent } from '../components/CommandBar/CommandBarTeamEvent';

export interface IGuideEventPage {
    eventStore: EventStore
}

export const GuideEventPage = observer((props: IGuideEventPage) => {
    const { eventStore } = props;
    const userStore = eventStore.rootStore.userStore;
    const isAdmin = userStore.isAdmin;
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
            await eventStore.rootStore.userStore.getTeamSubtasks();

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
    const { taskStore } = event;
    const [mainTasks, additionalTasks] = taskStore.sortTasks();
    let showButtons = false;
    if (event.state !== EventStatus.Closed && isAdmin) {
        showButtons = true;
    }

    return (
        <div>
            <CommandBarTeamEvent eventStore={eventStore} />
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
                        userStore={userStore}
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
                        userStore={userStore}
                        onTaskCreated={refreshEvent}
                    />
                </div>
            }
        </div>
    );
});