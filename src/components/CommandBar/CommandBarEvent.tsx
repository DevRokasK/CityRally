import * as React from 'react';
import { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import IconButton from '@mui/material/IconButton';
import BackIcon from '@mui/icons-material/ArrowBackIos';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';

import "./CommandBar.css";

import { ColorButton } from '../BaseComponents/Buttons';
import { EventStatus } from '../../models/Event';
import { EventStore } from '../../stores/EventStore';
import { EventSettingsModal } from '../Modals/EventSettingsModal';

export interface ICommandBarEvent {
    eventStore: EventStore;
}

export const CommandBarEvent = observer((props: ICommandBarEvent) => {
    const { eventStore } = props;
    const { selectedEvent } = eventStore;

    if (!selectedEvent) {
        return null;
    }

    const { state, title: eventTitle, } = selectedEvent;

    const [isModalOpen, setModalOpen] = useState(false);
    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);

    const handleUpdate = async () => {
        const success = await eventStore.updateEvent();

        if (success) {
            const updatedEvent = await eventStore.selectEvent(selectedEvent.id.toString());
            eventStore.setEvent(updatedEvent);
            handleClose();
        } else {
            console.log("Failed to update the event. Please try again.");
        }
    };

    const navigate = useNavigate();

    const handleCreate = () => {
        eventStore.createEvent();
        navigate('/');
    };

    const handleSave = () => {
        eventStore.saveEvent();
        navigate('/');
    };

    const handleSaveAsDraft = async (createNew: boolean) => {
        await eventStore.saveAsDraftEvent(createNew);
        navigate('/');
    };

    const handleDelete = async () => {
        await eventStore.deleteEvent();
        navigate('/');
    };

    let eventCommandProps = null;

    switch (state) {
        case EventStatus.New: {
            eventCommandProps = (
                <React.Fragment>
                    <Typography variant="h5" component="div" className="eventTitle">
                        {eventTitle}
                    </Typography>
                    <div className="eventEdit" onClick={handleOpen}>
                        <EditIcon className="iconColor" />
                        <Typography variant="body2" className="eventSettings">
                            Edit settings
                        </Typography>
                    </div>
                    <div className="eventSave">
                        <ColorButton className="item" variant="contained" onClick={() => handleSaveAsDraft(true)}>Create as draft</ColorButton>
                        <ColorButton className="item" variant="contained" onClick={handleCreate}>Create</ColorButton>
                    </div>
                </React.Fragment>
            );
            break;
        }
        case EventStatus.Created: {
            eventCommandProps = (
                <React.Fragment>
                    <Typography variant="h5" component="div" className="eventTitle">
                        {eventTitle}
                    </Typography>
                    <div className="eventEdit" onClick={handleOpen}>
                        <EditIcon className="iconColor" />
                        <Typography variant="body2" className="eventSettings">
                            Edit settings
                        </Typography>
                    </div>
                    <div className="eventSave">
                        <ColorButton className="item" variant="contained" onClick={() => handleSaveAsDraft(false)}>Save as draft</ColorButton>
                        <ColorButton className="item" variant="contained" onClick={handleSave}>Save</ColorButton>
                    </div>
                </React.Fragment>
            );
            break;
        }
        case EventStatus.Started: {
            eventCommandProps = (
                <React.Fragment>
                    <Typography variant="h5" component="div" className="eventTitle">
                        {eventTitle}
                    </Typography>
                    <div className="eventEdit" onClick={handleOpen}>
                        <EditIcon className="iconColor" />
                        <Typography variant="body2" className="eventSettings">
                            Edit settings
                        </Typography>
                    </div>
                    <div className="eventSave">
                        <ColorButton className="item" variant="contained" onClick={() => handleSaveAsDraft(true)}>Create as draft</ColorButton>
                        <ColorButton className="item" variant="contained" onClick={handleSave}>Save</ColorButton>
                    </div>
                </React.Fragment>
            );
            break;
        }
        case EventStatus.Draft: {
            eventCommandProps = (
                <React.Fragment>
                    <Typography variant="h5" component="div" className="eventTitle">
                        {eventTitle}
                    </Typography>
                    <div className="eventEdit" onClick={handleOpen}>
                        <EditIcon className="iconColor" />
                        <Typography variant="body2" className="eventSettings">
                            Edit settings
                        </Typography>
                    </div>
                    <div className="eventSave">
                        <ColorButton className="item" variant="contained" onClick={handleDelete}>Delete</ColorButton>
                        <ColorButton className="item" variant="contained" onClick={() => handleSaveAsDraft(false)}>Save as draft</ColorButton>
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
                        <ColorButton className="item" variant="contained" onClick={handleDelete}>Delete</ColorButton>
                        <ColorButton className="item" variant="contained" onClick={() => handleSaveAsDraft(true)}>Create as draft</ColorButton>
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
                <EventSettingsModal isOpen={isModalOpen} onSave={handleUpdate} onClose={handleClose} event={selectedEvent} />
            }
        </React.Fragment>
    );
});