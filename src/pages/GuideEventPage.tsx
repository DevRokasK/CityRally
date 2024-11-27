import * as React from 'react';

import { observer } from 'mobx-react-lite';

import "../styles/App.css";

import { EventStore } from '../stores/EventStore';

export interface IGuideEventPage {
    eventStore: EventStore
}

export const GuideEventPage = observer((props: IGuideEventPage) => {
    const { eventStore } = props;

    return (
        <div>
        </div>
    );
});