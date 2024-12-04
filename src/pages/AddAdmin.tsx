import * as React from 'react';

import { observer } from 'mobx-react-lite';

import "../styles/App.css";

import { IconButton, TextField, Typography } from '@mui/material';
import BackIcon from '@mui/icons-material/ArrowBackIos';
import { Link, useNavigate } from 'react-router-dom';

import { UserStore } from '../stores/UserStore';
import { ColorButton } from '../components/BaseComponents/Buttons';

export interface ILoginProps {
    userStore: UserStore;
}

export const AddAdmin = observer((props: ILoginProps) => {
    const navigate = useNavigate();
    const { userStore } = props;

    const [adminName, setAdminName] = React.useState("");
    const [adminEmail, setAdminEmail] = React.useState("");
    const [adminPassword, setAdminPassword] = React.useState("");
    const [inviteKey, setInviteKey] = React.useState("");

    const handleAddAdmin = async () => {
        if (adminName && adminEmail && adminPassword && inviteKey) {
            const response = await userStore.addAdmin(adminName, adminEmail, adminPassword, inviteKey);
            if (response) {
                navigate('/');
            }
        }
    };

    return (
        <React.Fragment>
            <div className='changePassword'>
                <div className='changePasswordContainer'>
                    <div className='changePasswordHeader'>
                        <Link to="/" className='buttonFloatLeft'>
                            <IconButton aria-label="back">
                                <BackIcon className="iconColor" />
                            </IconButton>
                        </Link>
                        <Typography variant="h5" component="div">
                            Invite a new Admin
                        </Typography>
                    </div>
                    <TextField
                        sx={{ width: "100%" }}
                        id="admin-name"
                        label="Name"
                        variant="standard"
                        value={adminName}
                        onChange={(e) => setAdminName(e.target.value)}
                    />
                    <TextField
                        sx={{ width: "100%" }}
                        id="admin-email"
                        label="Email"
                        variant="standard"
                        value={adminEmail}
                        onChange={(e) => setAdminEmail(e.target.value)}
                    />
                    <TextField
                        sx={{ width: "100%" }}
                        id="admin-password"
                        label="Password"
                        variant="standard"
                        type="password"
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                    />
                    <TextField
                        sx={{ width: "100%" }}
                        id="invite-key"
                        label="Invite Key"
                        variant="standard"
                        type="password"
                        value={inviteKey}
                        onChange={(e) => setInviteKey(e.target.value)}
                    />
                    <ColorButton className="changePasswordButton" variant="contained" onClick={handleAddAdmin}>Add Admin</ColorButton>
                </div>
            </div>
        </React.Fragment>
    );
});