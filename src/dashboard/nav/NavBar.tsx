import React, { useState, MouseEvent } from "react";
import { SearchUser } from "./SearchUser";
// import { FriendReqs } from "./userDash/friendReqs";
import "./style.css"

interface User {
    firstName: string;
    lastName: string;
    _id: string;
}


interface Props {
    user: User | null;
}

export const NavBar: React.FC<Props> = (props) => {
    const [showFriendReqs, setShowFriendReqs] = useState(false);
    const [clickPosition, setClickPosition] = useState<{ x: number; y: number }>({
        x: 0,
        y: 0,
    });

    const handleShowFriendReqs = (e: MouseEvent) => {
        setShowFriendReqs(!showFriendReqs);
        setClickPosition({ x: e.clientX, y: e.clientY });
    };

    return (
        <div className="nav-bar">

            <SearchUser />
            <a href="/dashboard">Home</a>
            {/* <a href={`/user/${props._id}`}>My Profile</a> */}
            <div className="container" onClick={handleShowFriendReqs}>
                <span className="material-symbols-rounded">person_add</span>
                {/* {props.incomingFriendRequests && (
                    <div
                        className="incoming-friend-requests-container"
                        onClick={() => console.log("test")}
                    >
                        {props.incomingFriendRequests.length}
                    </div>
                )} */}
            </div>
            {showFriendReqs && (
                <div className="incoming-friend-requests-container"></div>
            )}
            {/* {showFriendReqs && <FriendReqs props={props._id} />} */}
            <a href="/log-out">Logout</a>
        </div>
    );
};
