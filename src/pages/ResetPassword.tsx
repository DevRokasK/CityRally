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

export const ChangePassword = observer((props: ILoginProps) => {
    const navigate = useNavigate();
    const { userStore } = props;

    const [adminEmail, setAdminEmail] = React.useState("");
    const [oldAdminPassword, setOldAdminPassword] = React.useState("");
    const [newAdminPassword, setNewAdminPassword] = React.useState("");

    const handlePasswordReset = async () => {
        if (adminEmail && oldAdminPassword && newAdminPassword) {
            const response = await userStore.resetPassword(adminEmail, oldAdminPassword, newAdminPassword);
            if (response) {
                navigate('/Login');
            }
        }
    };

    return (
        <React.Fragment>
            <div className='changePassword'>
                <div className='changePasswordContainer'>
                    <div className='changePasswordHeader'>
                        <Link to="/Login" className='buttonFloatLeft'>
                            <IconButton aria-label="back">
                                <BackIcon className="iconColor" />
                            </IconButton>
                        </Link>
                        <Typography variant="h5" component="div">
                            Change Password
                        </Typography>
                    </div>
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
                        id="admin-password-old"
                        label="Old Password"
                        variant="standard"
                        type="password"
                        value={oldAdminPassword}
                        onChange={(e) => setOldAdminPassword(e.target.value)}
                    />
                    <TextField
                        sx={{ width: "100%" }}
                        id="admin-password-new"
                        label="New Password"
                        variant="standard"
                        type="password"
                        value={newAdminPassword}
                        onChange={(e) => setNewAdminPassword(e.target.value)}
                    />
                    <ColorButton className="changePasswordButton" variant="contained" onClick={handlePasswordReset}>Reset password</ColorButton>
                </div>
            </div>
        </React.Fragment>
    );
});