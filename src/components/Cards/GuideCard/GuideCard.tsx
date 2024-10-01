import React from "react";

import { observer } from "mobx-react-lite";

import "./GuideCard.css";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { Guide } from "../../../models/Guide";
import { GuideStatusTag } from "../../Helpers/StatusTag";

export interface IGuideCardProps {
    guide: Guide;
    teamName: string;
};

export const GuideCard = observer((props: IGuideCardProps) => {
    const { guide, teamName } = props;
    const { name, email, status } = guide;

    const card = (
        <React.Fragment>
            <CardContent style={{ padding: 4 }}>
                <div className="guideCardContent">
                    <Typography variant="body2" component="div" style={{ fontWeight: "bold" }} >
                        {name}
                    </Typography>
                    <Typography variant="body2" component="div" >
                        {teamName}
                    </Typography>
                    <GuideStatusTag guideStatus={status} />
                    <Typography variant="body2" >
                        {email}
                    </Typography>
                </div>
            </CardContent>
        </React.Fragment>
    );

    return (
        <Box sx={{ minWidth: 440, maxWidth: 440 }} className="guideCard">
            <Card variant="outlined" >{card}</Card>
        </Box >
    );
});