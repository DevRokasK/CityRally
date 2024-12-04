import * as React from 'react';

import { observer } from 'mobx-react-lite';

import "../styles/App.css";
import { TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { UserStore } from '../stores/UserStore';
import { ColorButton, OutlinedButton } from '../components/BaseComponents/Buttons';

export interface ILoginProps {
    userStore: UserStore;
}

export const Login = observer((props: ILoginProps) => {
    const navigate = useNavigate();
    const { userStore } = props;

    const [adminEmail, setAdminEmail] = React.useState("");
    const [adminPassword, setAdminPassword] = React.useState("");
    const [guideEmail, setGuideEmail] = React.useState("");

    const handleAdminLogin = async () => {
        if (adminEmail && adminPassword) {
            const response = await userStore.login(adminEmail, adminPassword, "Admin");
            if (response) {
                navigate('/');
            }
        }
    };

    const handleGuideLogin = async () => {
        if (guideEmail) {
            const response = await userStore.login(guideEmail, "", "Guide");
            if (response) {
                navigate('/');
            }
        }
    };

    const navigeteToChangePassword = () => {
        navigate('/ChangePassword');
    }

    return (
        <React.Fragment>
            <div className='login'>
                <div className='loginContainer'>
                    <Typography variant="h5" component="div">
                        Login as Admin
                    </Typography>
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
                    <div className='buttonContainer'>
                        <ColorButton className="loginButton" variant="contained" onClick={handleAdminLogin}>Login</ColorButton>
                        <OutlinedButton variant="outlined" onClick={navigeteToChangePassword}>Change Password</OutlinedButton>
                    </div>
                </div>
                <div className='loginContainer'>
                    <Typography variant="h5" component="div">
                        Login as Guide
                    </Typography>
                    <TextField
                        sx={{ width: "100%" }}
                        id="guide-email"
                        label="Email"
                        variant="standard"
                        value={guideEmail}
                        onChange={(e) => setGuideEmail(e.target.value)}
                    />
                    <ColorButton className="loginButton" variant="contained" onClick={handleGuideLogin}>Login</ColorButton>
                </div>
            </div>
        </React.Fragment>
    );
});