import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";

import "./Footer.css"

export const Footer = observer(() => {
    return (
        <div className="footer">
            <Link
                to="https://bestkaunas.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="footerText"
            >
                More info about BEST Kaunas
            </Link>
        </div>
    );
});