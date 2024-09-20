import * as React from 'react';

import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import "./CommandBar.css";

import { ColorButton } from '../Buttons';

export const CommandBarHome = observer(() => {
    return (
        <div className="commandBar">
            <Link to="/Event">
                <ColorButton className="item" variant="contained">New Event</ColorButton>
            </Link>
        </div>
    );
});