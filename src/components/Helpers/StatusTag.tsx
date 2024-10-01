import { observer } from 'mobx-react-lite';

import "./Helpers.css";

import { GuideStatus } from '../../models/Guide';
import { EventStatus } from '../../models/Event';

export interface GuideStatusTagProps {
    guideStatus: GuideStatus;
}

export interface EventStatusTagProps {
    eventStatus: EventStatus;
}

export const GuideStatusTag = observer((props: GuideStatusTagProps) => {
    const { guideStatus } = props;

    let tagStyles = "";

    switch (guideStatus) {
        case GuideStatus.Invited: {
            tagStyles = "Invited";
            break;
        }
        case GuideStatus.Accepted: {
            tagStyles = "Accpeted";
            break;
        }
    }

    return (
        <div className={tagStyles}>{tagStyles}</div>
    );
});

export const EventStatusTag = observer((props: EventStatusTagProps) => {
    const { eventStatus } = props;

    let tagStyles = "";
    let tagTitle = "";

    switch (eventStatus) {
        case EventStatus.New: {
            tagStyles = "Draft";
            tagTitle = "New";
            break;
        }
        case EventStatus.Draft: {
            tagStyles = "Draft";
            tagTitle = "Draft";
            break;
        }
        case EventStatus.Created: {
            tagStyles = "Active";
            tagTitle = "Created";
            break;
        }
        case EventStatus.Started: {
            tagStyles = "Active";
            tagTitle = "Started";
            break;
        }
    }

    return (
        <div className={tagStyles}>{tagTitle}</div>
    );
});