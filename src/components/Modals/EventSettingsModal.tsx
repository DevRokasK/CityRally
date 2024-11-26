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
import { ColorButton, OutlinedButton } from "../BaseComponents/Buttons";
import { EventStatusTag } from "../BaseComponents/StatusTag";

export interface IEventSettingsModal {
    isOpen: boolean;
    onSave: () => void;
    onClose: () => void;
    event: Event;
};

export const EventSettingsModal = observer((props: IEventSettingsModal) => {
    const { isOpen, onSave, onClose, event } = props;
    const { title, description, startDate, endDate, state/* , primaryColor, secondaryColor */ } = event;

    const [startDateValue, setStartDateValue] = useState<Dayjs | null>(dayjs(startDate ? startDate : Date.now()));
    const [endDateValue, setEndDateValue] = useState<Dayjs | null>(dayjs(endDate ? endDate : Date.now()));
    const [startHour, setStartHour] = useState<string>(startDateValue?.hour().toString() || "00");
    const [startMinute, setStartMinute] = useState<string>(startDateValue?.minute().toString() || "00");
    const [endHour, setEndHour] = useState<string>(endDateValue?.hour().toString() || "00");
    const [endMinute, setEndMinute] = useState<string>(endDateValue?.minute().toString() || "00");

    const handleStartDateChange = (newValue: Dayjs | null) => {
        newValue = newValue.set('hour', parseInt(startHour)).set('minute', parseInt(startMinute));
        setStartDateValue(newValue);
        if (newValue) {
            setStartHour(newValue.hour().toString());
            setStartMinute(newValue.minute().toString());
            event.setStartDate(newValue.toDate());
        }
    };

    const handleEndDateChange = (newValue: Dayjs | null) => {
        newValue = newValue.set('hour', parseInt(endHour)).set('minute', parseInt(endMinute));
        setEndDateValue(newValue);
        if (newValue) {
            setEndHour(newValue.hour().toString());
            setEndMinute(newValue.minute().toString());
            event.setEndDate(newValue.toDate());
        }
    };

    const handleStartHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newStartHour = e.target.value;
        setStartHour(newStartHour);

        if (e.target.value === '') {
            return;
        }

        if (startDateValue) {
            const updatedDate = startDateValue.set('hour', parseInt(newStartHour));
            setStartDateValue(updatedDate);
            event.setStartDate(updatedDate.toDate());
        }
    };

    const handleStartMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newStartMinute = e.target.value;
        setStartMinute(newStartMinute);

        if (e.target.value === '') {
            return;
        }

        if (startDateValue) {
            const updatedDate = startDateValue.set('minute', parseInt(newStartMinute));
            setStartDateValue(updatedDate);
            event.setStartDate(updatedDate.toDate());
        }
    };

    const handleEndHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEndHour = e.target.value;
        setEndHour(newEndHour);
        
        if (e.target.value === '') {
            return;
        }    

        if (endDateValue) {
            const updatedDate = endDateValue.set('hour', parseInt(newEndHour));
            setEndDateValue(updatedDate);
            event.setEndDate(updatedDate.toDate());
        }
    };

    const handleEndMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEndMinute = e.target.value;
        setEndMinute(newEndMinute);
        
        if (e.target.value === '') {
            return;
        }

        if (endDateValue) {
            const updatedDate = endDateValue.set('minute', parseInt(newEndMinute));
            setEndDateValue(updatedDate);
            event.setEndDate(updatedDate.toDate());
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
                    onChange={(e) => event.setTitle(e.target.value)}
                />
                <TextField
                    sx={{ width: "100%", marginTop: "16px", marginBottom: "24px" }}
                    id="standard-multiline-flexible"
                    label="Description"
                    multiline
                    maxRows={4}
                    variant="standard"
                    defaultValue={description}
                    onChange={(e) => event.setDesctirption(e.target.value)}
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
                                    onChange={handleStartHourChange}
                                    inputProps={{ min: 0, max: 23 }}
                                />
                                <TextField
                                    label="Start Minute"
                                    type="number"
                                    variant="standard"
                                    className="smallTextfield"
                                    value={startMinute}
                                    onChange={handleStartMinuteChange}
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
                                    onChange={handleEndHourChange}
                                    inputProps={{ min: 0, max: 23 }}
                                />
                                <TextField
                                    label="End Minute"
                                    type="number"
                                    variant="standard"
                                    className="smallTextfield"
                                    value={endMinute}
                                    onChange={handleEndMinuteChange}
                                    inputProps={{ min: 0, max: 59 }}
                                />
                            </div>
                        </div>
                    </div>
                </LocalizationProvider>
                {/* <Typography variant="h6" >Select card colors</Typography>
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
                </div> */}
                <div className="modalFooterButtons">
                    <ColorButton variant="contained" onClick={onSave}>Save</ColorButton>
                    <OutlinedButton variant="outlined" onClick={onClose}>Cancel</OutlinedButton>
                </div>
            </div>
        </Modal>
    );
});
