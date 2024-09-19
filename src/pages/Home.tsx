import * as React from 'react';

import { observer } from 'mobx-react-lite';

import "../styles/App.css";

import { CommandBarHome } from '../components/CommandBar/CommandBar';
import { EventBar } from '../components/EventBar/EventBar';

export const Home = observer(() => {

    return (
        <div>
            <CommandBarHome />
            <div className="events">
                <EventBar title={"Current events"} count={1} />
                <EventBar title={"Draft events"} count={6} />
                <EventBar title={"Past events"} count={3} />
            </div>
        </div>
    );
});