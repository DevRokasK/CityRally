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

import { ColorButton } from '../BaseComponents/Buttons';
import { Event, EventStatus } from '../../models/Event';
import { EventStore } from '../../stores/EventStore';
import { EventSettingsModal } from '../Modals/EventSettingsModal';

export interface ICommandBarEvent {
    eventStore: EventStore;
    event: Event
}

export const CommandBarEvent = observer((props: ICommandBarEvent) => {
    const { eventStore, event } = props;
    const { state, title: initialEventTitle, } = event;

    const [isModalOpen, setModalOpen] = useState(false);
    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);

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

    switch (state) {
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
                    <div className="eventEdit" onClick={handleOpen}>
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
                    <div className="eventEdit" onClick={handleOpen}>
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
                    <div className="eventEdit" onClick={handleOpen}>
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
                    <div className="eventEdit" onClick={handleOpen}>
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
        <React.Fragment>
            <div className="commandBar">
                <Link to="/">
                    <IconButton aria-label="back">
                        <BackIcon className="iconColor" />
                    </IconButton>
                </Link>
                {eventCommandProps}
            </div>
            {isModalOpen &&
                <EventSettingsModal isOpen={isModalOpen} onClose={handleClose} event={event} />
            }
        </React.Fragment>
    );
});