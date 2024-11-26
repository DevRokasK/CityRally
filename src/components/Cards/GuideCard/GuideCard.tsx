import React from "react";

import { observer } from "mobx-react-lite";

import "./GuideCard.css";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { GuideStatusTag } from "../../BaseComponents/StatusTag";
import { Team } from "../../../models/Team";

export interface ITeamCardProps {
    team: Team;
};

export const TeamCard = observer((props: ITeamCardProps) => {
    const { team } = props;
    const { guides, title } = team;

    const cardContent = guides.map((guide, index) => {
        const isLast = index === guides.length - 1;
        return (
            <div
                className="guideCardContent"
                style={{
                    borderBottom: !isLast ? '1px solid rgba(0, 0, 0, 0.12)' : 'none',
                    marginBottom: !isLast ? '6px' : '0'
                }}
                key={index}
            >
                <Typography variant="body2" component="div" style={{ fontWeight: "bold" }} >
                    {guide.name}
                </Typography>
                <GuideStatusTag guideStatus={guide.status} />
            </div>
        );
    });

    const card = (
        <React.Fragment>
            <CardContent style={{ padding: 4 }}>
                <Typography variant="h6" component="div" className="teamTitle">
                    {title}
                </Typography>
                <div>
                    {cardContent}
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