import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";

import "./Header.css"

export const Header = observer(() => {
    return (
        <div className="header">
            <Link to="/" className="headerTitle">
                <h2>City Rally</h2>
            </Link>
        </div>
    );
});