import React, { useState, MouseEvent, useEffect } from "react";
import { SearchUser } from "./SearchUser";
import { FriendReqs } from "./FriendRequestsList";
import config from "../../config";
import "./style.css";
import { Link } from "react-router-dom";

interface User {
    firstName: string;
    lastName: string;
    _id: string;
    incomingFriendRequests: Array<string>;
}

interface Props {
    user: User | null;
}


export const NavBar: React.FC<Props> = (props) => {
    const [friendReqsList, setFriendReqsList] = useState([])
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const apiUrl =
        process.env.NODE_ENV === "development"
            ? config.development.apiUrl
            : config.production.apiUrl;

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const getFriendRequests = () => {
            fetch(`${apiUrl}/getFriendReqs/${props.user?._id}`, {
                credentials: "include",
            })
                .then((res) => res.json())
                .then((data) => {
                    setFriendReqsList(data);
                })
                .catch((error) => {
                    console.error("Error fetching friend requests:", error);
                });
        };

        getFriendRequests();
    }, []);

    return (
        <div className={`nav-bar ${isMenuOpen ? "menu-open" : ""}`}>
            <SearchUser />
            <div className="hamburger" onClick={toggleMenu}>
                <div className="icon-bar"></div>
                <div className="icon-bar"></div>
                <div className="icon-bar"></div>
            </div>
            <div className={`menu-items ${isMenuOpen ? "show-menu" : ""}`}>
                <Link to={"/dashboard"}>Dashboard</Link>
                <Link to={`/user/${props.user?._id}`}>Profile</Link>
                <div>
                    {/* <FriendReqs friendReqsList={friendReqsList} /> */}
                </div>
                <a href="/log-out">Logout</a>
            </div>
        </div>
    );
};
