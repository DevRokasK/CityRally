import * as React from 'react';
import { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import IconButton from '@mui/material/IconButton';
import BackIcon from '@mui/icons-material/ArrowBackIos';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import "./CommandBar.css";

import { ColorButton } from '../Helpers/Buttons';
import { EventStatus } from '../../models/Event';
import { EventStore } from '../../stores/EventStore';

export interface ICommandBarEvent {
    eventState: EventStatus;
    eventTitle: string;
    eventStore: EventStore;
}

export const CommandBarEvent = observer((props: ICommandBarEvent) => {
    const { eventState, eventTitle: initialEventTitle, eventStore } = props;

    const [eventTitle, setEventTitle] = useState(initialEventTitle);
    const navigate = useNavigate();

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = event.target.value;
        setEventTitle(newTitle);
        if (eventStore.selectedEvent) {
            eventStore.selectedEvent.setTitle(newTitle);
        }
    };

    const handleCreate = () => {
        eventStore.createEvent();
        navigate('/');
    };

    const handleSave = () => {
        eventStore.saveEvent();
        navigate('/');
    };

    const handleSaveAsDraft = () => {
        eventStore.saveAsDraftEvent();
        navigate('/');
    };

    const handleDelete = () => {
        eventStore.deleteEvent();
        navigate('/');
    };

    let eventCommandProps = null;

    switch (eventState) {
        case EventStatus.New: {
            eventCommandProps = (
                <React.Fragment>
                    <TextField
                        id="standard-basic"
                        variant="standard"
                        className='eventTitleEdit'
                        defaultValue={eventTitle}
                        onChange={handleTitleChange}
                    />
                    <div className="eventEdit">
                        <EditIcon className="iconColor" />
                        <Typography variant="body2" className="eventSettings">
                            Edit settings
                        </Typography>
                    </div>
                    <div className="eventSave">
                        <ColorButton className="item" variant="contained" onClick={handleSaveAsDraft}>Save as draft</ColorButton>
                        <ColorButton className="item" variant="contained" onClick={handleCreate}>Create</ColorButton>
                    </div>
                </React.Fragment>
            );
            break;
        }
        case EventStatus.Created: {
            eventCommandProps = (
                <React.Fragment>
                    <TextField
                        id="standard-basic"
                        variant="standard"
                        className='eventTitleEdit'
                        defaultValue={eventTitle}
                        onChange={handleTitleChange}
                    />
                    <div className="eventEdit">
                        <EditIcon className="iconColor" />
                        <Typography variant="body2" className="eventSettings">
                            Edit settings
                        </Typography>
                    </div>
                    <div className="eventSave">
                        <ColorButton className="item" variant="contained" onClick={handleSaveAsDraft}>Save as draft</ColorButton>
                        <ColorButton className="item" variant="contained" onClick={handleSave}>Save</ColorButton>
                    </div>
                </React.Fragment>
            );
            break;
        }
        case EventStatus.Started: {
            eventCommandProps = (
                <React.Fragment>
                    <TextField
                        id="standard-basic"
                        variant="standard"
                        className='eventTitleEdit'
                        defaultValue={eventTitle}
                        onChange={handleTitleChange}
                    />
                    <div className="eventEdit">
                        <EditIcon className="iconColor" />
                        <Typography variant="body2" className="eventSettings">
                            Edit settings
                        </Typography>
                    </div>
                    <div className="eventSave">
                        <ColorButton className="item" variant="contained" onClick={handleSave}>Save</ColorButton>
                    </div>
                </React.Fragment>
            );
            break;
        }
        case EventStatus.Draft: {
            eventCommandProps = (
                <React.Fragment>
                    <TextField
                        id="standard-basic"
                        variant="standard"
                        className='eventTitleEdit'
                        defaultValue={eventTitle}
                        onChange={handleTitleChange}
                    />
                    <div className="eventEdit">
                        <EditIcon className="iconColor" />
                        <Typography variant="body2" className="eventSettings">
                            Edit settings
                        </Typography>
                    </div>
                    <div className="eventSave">
                        <ColorButton className="item" variant="contained" onClick={handleDelete}>Delete</ColorButton>
                        <ColorButton className="item" variant="contained" onClick={handleSaveAsDraft}>Save as draft</ColorButton>
                        <ColorButton className="item" variant="contained" onClick={handleCreate}>Create</ColorButton>
                    </div>
                </React.Fragment>
            );
            break;
        }
        case EventStatus.Closed: {
            eventCommandProps = (
                <React.Fragment>
                    <Typography variant="h5" component="div" className="eventTitle">
                        {eventTitle}
                    </Typography>
                    <div className="eventSave">
                        <ColorButton className="item" variant="contained" onClick={handleSaveAsDraft}>Create as draft</ColorButton>
                    </div>
                </React.Fragment>
            );
            break;
        }
    }

    return (
        <div className="commandBar">
            <Link to="/">
                <IconButton aria-label="back">
                    <BackIcon className="iconColor" />
                </IconButton>
            </Link>
            {eventCommandProps}
        </div>
    );
});