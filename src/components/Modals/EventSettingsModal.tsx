import React, { useState } from "react";

import { observer } from "mobx-react-lite";

import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { TextField, Typography } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import dayjs, { Dayjs } from 'dayjs';

import "./Modals.css";

import { Event } from "../../models/Event";
import { ColorButton, OutlinedButton } from "../Helpers/Buttons";
import { EventStatusTag } from "../Helpers/StatusTag";

export interface IEventSettingsModal {
    isOpen: boolean;
    onClose: () => void;
    event: Event;
};

export const EventSettingsModal = observer((props: IEventSettingsModal) => {
    const { isOpen, onClose, event } = props;
    const { title, description, startDate, endDate, state, primaryColor, secondaryColor } = event;

    const [startDateValue, setStartDateValue] = useState<Dayjs | null>(dayjs(startDate ? startDate : Date.now()));
    const [endDateValue, setEndDateValue] = useState<Dayjs | null>(dayjs(endDate ? startDate : Date.now()));
    const [startHour, setStartHour] = useState<string>(startDateValue?.hour().toString() || "00");
    const [startMinute, setStartMinute] = useState<string>(startDateValue?.minute().toString() || "00");
    const [endHour, setEndHour] = useState<string>(endDateValue?.hour().toString() || "00");
    const [endMinute, setEndMinute] = useState<string>(endDateValue?.minute().toString() || "00");

    const handleStartDateChange = (newValue: Dayjs | null) => {
        setStartDateValue(newValue);
        if (newValue) {
            setStartHour(newValue.hour().toString());
            setStartMinute(newValue.minute().toString());
        }
    };

    const handleEndDateChange = (newValue: Dayjs | null) => {
        setEndDateValue(newValue);
        if (newValue) {
            setEndHour(newValue.hour().toString());
            setEndMinute(newValue.minute().toString());
        }
    };

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className="editEventSettings">
                <div className="modalHeader">
                    <Typography variant="h6" >Event information</Typography>
                    <div className="rightSection">
                        <EventStatusTag eventStatus={state} />
                        <IconButton aria-label="close" onClick={onClose}>
                            <CloseIcon className="iconColor" />
                        </IconButton>
                    </div>
                </div>
                <TextField
                    sx={{ width: "100%" }}
                    id="standard-basic"
                    label="Title"
                    variant="standard"
                    className='eventTitleEdit'
                    defaultValue={title}
                />
                <TextField
                    sx={{ width: "100%", marginTop: "16px", marginBottom:"24px" }}
                    id="standard-multiline-flexible"
                    label="Description"
                    multiline
                    maxRows={4}
                    variant="standard"
                    defaultValue={description}
                />
                <Typography variant="h6" >Event date</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div className="datepickerContainer">
                        <div style={{ flex: 1 }}>
                            <DatePicker
                                label="Start Date"
                                value={startDateValue}
                                onChange={handleStartDateChange}
                                sx={{ width: "100%" }}
                            />
                            <div className="timeContainer">
                                <TextField
                                    label="Start Hour"
                                    type="number"
                                    variant="standard"
                                    className="smallTextfield"
                                    value={startHour}
                                    onChange={(e) => setStartHour(e.target.value)}
                                    inputProps={{ min: 0, max: 23 }}
                                />
                                <TextField
                                    label="Start Minute"
                                    type="number"
                                    variant="standard"
                                    className="smallTextfield"
                                    value={startMinute}
                                    onChange={(e) => setStartMinute(e.target.value)}
                                    inputProps={{ min: 0, max: 59 }}
                                />
                            </div>
                        </div>
                        <div style={{ flex: 1 }}>
                            <DatePicker
                                label="End Date"
                                value={endDateValue}
                                onChange={handleEndDateChange}
                                sx={{ width: "100%" }}
                            />
                            <div className="timeContainer">
                                <TextField
                                    label="End Hour"
                                    type="number"
                                    variant="standard"
                                    className="smallTextfield"
                                    value={endHour}
                                    onChange={(e) => setEndHour(e.target.value)}
                                    inputProps={{ min: 0, max: 23 }}
                                />
                                <TextField
                                    label="End Minute"
                                    type="number"
                                    variant="standard"
                                    className="smallTextfield"
                                    value={endMinute}
                                    onChange={(e) => setEndMinute(e.target.value)}
                                    inputProps={{ min: 0, max: 59 }}
                                />
                            </div>
                        </div>
                    </div>
                </LocalizationProvider>
                <Typography variant="h6" >Select card colors</Typography>
                <div className="colorContainer">
                    <TextField
                        id="standard-basic"
                        label="Primary color"
                        variant="standard"
                        className='eventTitleEdit'
                        defaultValue={primaryColor}
                    />
                    <TextField
                        id="standard-basic"
                        label="Secondary color"
                        variant="standard"
                        className='eventTitleEdit'
                        defaultValue={secondaryColor}
                    />
                </div>
                <div className="modalFooterButtons">
                    <ColorButton variant="contained">Save</ColorButton>
                    <OutlinedButton variant="outlined" onClick={onClose}>Cancel</OutlinedButton>
                </div>
            </div>
        </Modal>
    );
});
