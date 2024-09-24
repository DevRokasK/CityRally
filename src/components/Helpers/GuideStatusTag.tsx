import { observer } from 'mobx-react-lite';

import "./Helpers.css";

import { GuideStatus } from '../../models/Guide';

export interface GuideStatusTagProps {
    guideStatus: GuideStatus;
}

export const GuideStatusTag = observer((props: GuideStatusTagProps) => {
    const { guideStatus } = props;

    let tagStyles = "";

    switch (guideStatus) {
        case GuideStatus.Invited: {
            tagStyles = "invitedTag";
            break;
        }
        case GuideStatus.Accepted: {
            tagStyles = "acceptedTag";
            break;
        }
        case GuideStatus.Declined: {
            tagStyles = "declinedTag";
            break;
        }
    }

    return (
        <div className={tagStyles}>{guideStatus}</div>
    );
});