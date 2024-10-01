import React, { useState } from "react";

import { observer } from "mobx-react-lite";

import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { TextField } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import dayjs, { Dayjs } from 'dayjs';

import "./Modals.css";

import { Event } from "../../models/Event";
import { ColorButton, OutlinedButton } from "../Helpers/Buttons";
import { HexColorPicker } from "react-colorful";

export interface IEventSettingsModal {
    isOpen: boolean;
    onClose: () => void;
    event: Event;
};

export const EventSettingsModal = observer((props: IEventSettingsModal) => {
    const { isOpen, onClose, event } = props;
    const { title, description, startDate, endDate, primaryColor, secondaryColor } = event;

    const [startDateValue, setStartDateValue] = useState<Dayjs | null>(dayjs(startDate));
    const [endDateValue, setEndDateValue] = useState<Dayjs | null>(dayjs(endDate));
    const [startHour, setStartHour] = useState<string>(startDateValue?.hour().toString() || "00");
    const [startMinute, setStartMinute] = useState<string>(startDateValue?.minute().toString() || "00");
    const [endHour, setEndHour] = useState<string>(endDateValue?.hour().toString() || "00");
    const [endMinute, setEndMinute] = useState<string>(endDateValue?.minute().toString() || "00");

    const [pColor, setPColor] = React.useState(primaryColor);
    const [sColor, setSColor] = React.useState(secondaryColor);

    const primaryHandleChange = (color: string) => {
        setPColor(color)
    }

    const secondaryHandleChange = (color: string) => {
        setSColor(color)
    }

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
                    <TextField
                        id="standard-basic"
                        label="Title"
                        variant="standard"
                        className='eventTitleEdit'
                        defaultValue={title}
                    />
                    <IconButton aria-label="close" onClick={onClose}>
                        <CloseIcon className="iconColor" />
                    </IconButton>
                </div>
                <TextField
                    sx={{ width: "100%", marginTop: "16px" }}
                    id="standard-multiline-flexible"
                    label="Description"
                    multiline
                    maxRows={2}
                    variant="standard"
                    defaultValue={description}
                />
                <div className="editEventSettings">
                    <div className="modalHeader">
                        <TextField
                            id="standard-basic"
                            label="Title"
                            variant="standard"
                            className='eventTitleEdit'
                            defaultValue={title}
                        />
                        <IconButton aria-label="close" onClick={onClose}>
                            <CloseIcon className="iconColor" />
                        </IconButton>
                    </div>
                    <TextField
                        sx={{ width: "100%", marginTop: "16px" }}
                        id="standard-multiline-flexible"
                        label="Description"
                        multiline
                        maxRows={2}
                        variant="standard"
                        defaultValue={description}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "16px" }}>
                            <div style={{ flex: 1, marginRight: "8px" }}>
                                <DatePicker
                                    label="Start Date"
                                    value={startDateValue}
                                    onChange={handleStartDateChange}
                                    sx={{ width: "100%" }}
                                />
                                <TextField
                                    label="Start Hour"
                                    type="number"
                                    variant="standard"
                                    value={startHour}
                                    onChange={(e) => setStartHour(e.target.value)}
                                    inputProps={{ min: 0, max: 23 }}
                                    sx={{ marginTop: "8px", width: "100%" }}
                                />
                                <TextField
                                    label="Start Minute"
                                    type="number"
                                    variant="standard"
                                    value={startMinute}
                                    onChange={(e) => setStartMinute(e.target.value)}
                                    inputProps={{ min: 0, max: 59 }}
                                    sx={{ marginTop: "8px", width: "100%" }}
                                />
                            </div>
                            <div style={{ flex: 1, marginLeft: "8px" }}>
                                <DatePicker
                                    label="End Date"
                                    value={endDateValue}
                                    onChange={handleEndDateChange}
                                    sx={{ width: "100%" }}
                                />
                                <TextField
                                    label="End Hour"
                                    type="number"
                                    variant="standard"
                                    value={endHour}
                                    onChange={(e) => setEndHour(e.target.value)}
                                    inputProps={{ min: 0, max: 23 }}
                                    sx={{ marginTop: "8px", width: "100%" }}
                                />
                                <TextField
                                    label="End Minute"
                                    type="number"
                                    variant="standard"
                                    value={endMinute}
                                    onChange={(e) => setEndMinute(e.target.value)}
                                    inputProps={{ min: 0, max: 59 }}
                                    sx={{ marginTop: "8px", width: "100%" }}
                                />
                            </div>
                        </div>
                    </LocalizationProvider>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "16px" }}>
                        <HexColorPicker color={pColor} onChange={primaryHandleChange} />
                        <HexColorPicker color={sColor} onChange={secondaryHandleChange} />
                    </div>
                    <div className="modalFooterButtons">
                        <ColorButton className="item" variant="contained">Save</ColorButton>
                        <OutlinedButton className="item" variant="outlined" onClick={onClose}>Cancel</OutlinedButton>
                    </div>
                </div>
            </div>
        </Modal>
    );
});
