import React from "react";
import { observer } from "mobx-react-lite";

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import TextField from "@mui/material/TextField";

import { Team } from "../../models/Team";
import { Guide, GuideStatus } from "../../models/Guide";
import { ColorButton, OutlinedButton } from "../BaseComponents/Buttons";

export interface IGuideModal {
    isOpen: boolean;
    onSave: () => void;
    onCreate: () => void;
    onClose: () => void;
    onTeamDelete: () => void;
    team: Team;
};

export const GuideModal = observer((props: IGuideModal) => {
    const { isOpen, onSave, onCreate, onClose, onTeamDelete, team } = props;
    const { guides, title } = team;

    const [inputKey, setInputKey] = React.useState<number>(0);
    const [modalKey, setModalKey] = React.useState<number>(50);

    const [initialGuides] = React.useState<Guide[]>([...guides]);
    const [newGuide, setNewGuide] = React.useState<Guide>(
        new Guide({
            id: 0,
            name: "",
            email: "",
            status: GuideStatus.Invited
        })
    );

    const onAdd = () => {
        if (newGuide.name === "" || newGuide.email === "") {
            return;
        }

        const updatedGuides = [...guides, newGuide];
        team.setGuides(updatedGuides);
        setNewGuide(new Guide({
            id: 0,
            name: "",
            email: "",
            status: GuideStatus.Invited
        }));

        setInputKey(prevKey => prevKey + 1);
    };

    const onDelete = (index: number) => {
        team.removeGuide(index);
        setModalKey(prevKey => prevKey + 1);
    };

    const onCancel = () => {
        team.setGuides(initialGuides);
        onClose();
    };

    const onSaveTeam = () => {
        onAdd();
        onSave();
    };

    const onCreateTeam = () => {
        onAdd();
        onCreate();
    };

    const guideContent = guides?.map((guide, index) => {
        return (
            <div key={index} className="timeContainer">
                <TextField
                    sx={{ width: "100%" }}
                    id="standard-basic"
                    label="Name"
                    variant="standard"
                    className='eventTitleEdit'
                    defaultValue={guide.name}
                    onChange={(e) => guide.setName(e.target.value)}
                />
                <TextField
                    sx={{ width: "100%" }}
                    id="standard-basic"
                    label="Email"
                    variant="standard"
                    className='eventTitleEdit'
                    defaultValue={guide.email}
                    onChange={(e) => guide.setEmail(e.target.value)}
                />
                <IconButton aria-label="delete" onClick={() => onDelete(index)}>
                    <DeleteIcon className="iconColor" />
                </IconButton>
            </div>
        );
    })

    return (
        <Modal
            open={isOpen}
            onClose={onCancel}
            key={modalKey}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className="editEventSettings">
                <div className="modalHeader">
                    <Typography variant="h6" >Task information</Typography>
                    <div className="rightSection">
                        {team.id !== 0 &&
                            <ColorButton variant="contained" onClick={onTeamDelete}>Delete</ColorButton>
                        }
                        <IconButton aria-label="close" onClick={onCancel}>
                            <CloseIcon className="iconColor" />
                        </IconButton>
                    </div>
                </div>
                <div>
                    <TextField
                        sx={{ width: "100%" }}
                        id="standard-basic"
                        label="Team title"
                        variant="standard"
                        className='eventTitleEdit'
                        defaultValue={title}
                        onChange={(e) => team.setTitle(e.target.value)}
                    />
                    {guideContent}
                    <div className="timeContainer">
                        <TextField
                            sx={{ width: "100%" }}
                            id="standard-basic"
                            label="Name"
                            variant="standard"
                            className='eventTitleEdit'
                            defaultValue={newGuide.name}
                            onChange={(e) => newGuide.setName(e.target.value)}
                            key={inputKey}
                        />
                        <TextField
                            sx={{ width: "100%" }}
                            id="standard-basic"
                            label="Email"
                            variant="standard"
                            className='eventTitleEdit'
                            defaultValue={newGuide.email}
                            onChange={(e) => newGuide.setEmail(e.target.value)}
                            key={inputKey + 100}
                        />
                        <IconButton aria-label="Add" onClick={onAdd}>
                            <AddIcon className="iconColor" />
                        </IconButton>
                    </div>
                </div>
                <div className="modalFooterButtons">
                    {team.id === 0 ?
                        <ColorButton variant="contained" onClick={onCreateTeam}>Create</ColorButton>
                        :
                        <ColorButton variant="contained" onClick={onSaveTeam}>Save</ColorButton>
                    }
                    <OutlinedButton variant="outlined" onClick={onCancel}>Cancel</OutlinedButton>
                </div>
            </div>
        </Modal>
    );
});