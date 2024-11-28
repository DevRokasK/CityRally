import * as React from 'react';

import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import IconButton from '@mui/material/IconButton';
import BackIcon from '@mui/icons-material/ArrowBackIos';
import Typography from '@mui/material/Typography';

import "./CommandBar.css";

import { EventStore } from '../../stores/EventStore';

export interface ICommandBarEvent {
    eventStore: EventStore;
}

export const CommandBarTeamEvent = observer((props: ICommandBarEvent) => {
    const { eventStore } = props;
    const { selectedEvent } = eventStore;

    const team = selectedEvent.teamStore.teams.find(
        (team) => team.id === eventStore.rootStore.userStore.teamId
    );
    const teamTitle = team ? team.title : "";

    if (!selectedEvent) {
        return null;
    }

    const { title: eventTitle, } = selectedEvent;

    return (
        <React.Fragment>
            <div className="commandBar">
                <Link to="/">
                    <IconButton aria-label="back">
                        <BackIcon className="iconColor" />
                    </IconButton>
                </Link>
                <Typography variant="h5" component="div" className="teamEventTitle">
                    {eventTitle}
                </Typography>
                <Typography variant="h6" component="div" className="teamName">
                    Team: {teamTitle}
                </Typography>
            </div>
        </React.Fragment>
    );
});