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