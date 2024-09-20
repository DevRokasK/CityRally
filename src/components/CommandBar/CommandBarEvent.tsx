import * as React from 'react';

import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import IconButton from '@mui/material/IconButton';
import BackIcon from '@mui/icons-material/ArrowBackIos';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import "./CommandBar.css";

import { ColorButton } from '../Buttons';
import { EventStatus } from '../../models/Event';

export interface ICommandBarEvent {
    eventState: EventStatus;
    eventTitle: string;
}

export const CommandBarEvent = observer((props: ICommandBarEvent) => {
    const { eventState, eventTitle } = props;

    let eventCommandProps = null;

    switch (eventState) {
        case EventStatus.New: {
            eventCommandProps = (
                <React.Fragment>
                    <TextField id="standard-basic" variant="standard" className='eventTitleEdit' defaultValue={eventTitle} />
                    <div className="eventEdit">
                        <EditIcon className="iconColor" />
                        <Typography variant="body2" className="eventSettings">
                            Edit settings
                        </Typography>
                    </div>
                    <div className="eventSave">
                        <ColorButton className="item" variant="contained">Save as draft</ColorButton>
                        <ColorButton className="item" variant="contained">Create</ColorButton>
                    </div>
                </React.Fragment>
            );
            break;
        }
        case EventStatus.Current: {
            eventCommandProps = (
                <React.Fragment>
                    <TextField id="standard-basic" variant="standard" className='eventTitleEdit' defaultValue={eventTitle} />
                    <div className="eventEdit">
                        <EditIcon className="iconColor" />
                        <Typography variant="body2" className="eventSettings">
                            Edit settings
                        </Typography>
                    </div>
                    <div className="eventSave">
                        <ColorButton className="item" variant="contained">Save</ColorButton>
                    </div>
                </React.Fragment>
            );
            break;
        }
        case EventStatus.Draft: {
            eventCommandProps = (
                <React.Fragment>
                    <TextField id="standard-basic" variant="standard" className='eventTitleEdit' defaultValue={eventTitle} />
                    <div className="eventEdit">
                        <EditIcon className="iconColor" />
                        <Typography variant="body2" className="eventSettings">
                            Edit settings
                        </Typography>
                    </div>
                    <div className="eventSave">
                        <ColorButton className="item" variant="contained">Delete</ColorButton>
                        <ColorButton className="item" variant="contained">Save as draft</ColorButton>
                        <ColorButton className="item" variant="contained">Create</ColorButton>
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