import * as React from 'react';

import { observer } from 'mobx-react-lite';

import "../styles/App.css";

import CircularProgress from '@mui/material/CircularProgress/CircularProgress';

import { EventStore } from '../stores/EventStore';
import { CommandBarHome } from '../components/CommandBar/CommandBarHome';
import { EventBar } from '../components/Bars/EventBar/EventBar';

export interface IHomeProps {
    eventStore: EventStore;
}

export const Home = observer((props: IHomeProps) => {
    const { eventStore } = props;
    const idAdmin = eventStore.rootStore.userStore.isAdmin;
    const { loading } = eventStore;

    React.useEffect(() => {
        eventStore.init();

        return () => { };
    }, [eventStore]);

    const [currentEvents, draftEvents, pastEvents] = eventStore.sortEvents();

    return (
        <div>
            {idAdmin &&
                <CommandBarHome />
            }
            {loading ?
                <div>
                    <CircularProgress color="secondary" />
                </div>
                :
                <div className="events">
                    <EventBar title={"Current events"} events={currentEvents} isBorderless={false} isAdmin={idAdmin} />
                    {idAdmin &&
                        <React.Fragment>
                            <EventBar title={"Draft events"} events={draftEvents} isBorderless={false} isAdmin={idAdmin} />
                            <EventBar title={"Past events"} events={pastEvents} isBorderless={true} isAdmin={idAdmin} />
                        </React.Fragment>
                    }
                </div>
            }

        </div>
    );
});