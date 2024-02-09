import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TERipple } from "tw-elements-react";
import "./style.css"
import config from "../../config";
import Bio from "./Bio";
import { FriendsList } from "./FriendsList";
import { Posts } from "./Posts";
import { NewPost } from "../../dashboard/NewPost";
import { ConfirmDelete } from "../ConfirmDeleteFriend";

interface User {
    firstName: string;
    lastName: string;
    _id: string,
    incomingFriendRequests: Array<string>;
    outgoingFriendRequests: Array<string>;
    friends: Array<string>
}


interface Props {
    user: User | null;
}

export const UserProfile: React.FC<Props> = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [loggedUser, setLoggedUser] = useState<any>("");
    const [posts, setPosts] = useState<any[]>([]);
    const [user, setUser] = useState<any>("");
    const id = useParams<{ id: string }>().id ?? ""
    const apiUrl =
        process.env.NODE_ENV === "development"
            ? config.development.apiUrl
            : config.production.apiUrl;

    useEffect(() => {
        const getUserPosts = () => {
            fetch(`${apiUrl}/user/${id}/posts`, {
                credentials: "include",
            })
                .then((res) => res.json())
                .then((res) => setPosts(res));
            setIsLoading(false);
        };

        getUserPosts();
    }, [apiUrl, id]);

    useEffect(() => {
        const img = new Image();
        img.src = `${apiUrl}/images/${user.profile_pic}`;
        img.onload = () => {
            setImageLoaded(true);
        };
        img.onerror = () => {
            setImageLoaded(false);
        };
    }, [user.profile_pic]);




    const acceptFriend = (_id: string) => {
        console.log(_id)
        fetch(`${apiUrl}/acceptFriendReq/${_id}`, {
            credentials: "include",
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                RequestingFriendsId: _id,
            }),
        });
    };

    const addFriend = () => {
        fetch(`${apiUrl}/sendFriendReq/${id}`, {
            credentials: "include",
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: loggedUser._id,
            }),
        });
    };

    const deleteFriend = () => {
        fetch(`${apiUrl}/deleteFriend/${id}`, {
            credentials: "include",
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: loggedUser._id,
            }),
        });
    };

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await fetch(`${apiUrl}/user/${id}`, {
                    credentials: "include",
                });
                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        }
        async function getUser() {
            try {
                const response = await fetch(`${apiUrl}`, {
                    credentials: "include",
                });
                const data = await response.json();
                setLoggedUser(data.user);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        }

        fetchUser();
        getUser()
    }, [apiUrl, id]);

    return (
        <div className="grid-container">
            <div className="grid-item">    <div className="text-center">
                <img
                    src={imageLoaded ? `${apiUrl}/images/${user.profile_pic}` : user.profile_pic}
                    className="w-32 mx-auto mb-4 rounded-lg"
                    alt={imageLoaded ? 'Loaded Avatar' : 'Default Avatar'}
                />

                <h5 className="mb-2 text-xl font-medium leading-tight">{user.firstName} {user.lastName}</h5>
                {id !== props.user?._id && (
                    <>
                        {!props.user?.outgoingFriendRequests.includes(id) && !props.user?.friends.includes(id) && (
                            <TERipple>
                                <button
                                    onClick={() => addFriend()}
                                    type="button"
                                    className="inline-block rounded bg-success px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
                                >
                                    Add Friend
                                </button>
                            </TERipple>
                        )}

                        {props.user?.outgoingFriendRequests.includes(id) && (
                            <TERipple>
                                <button
                                    type="button"
                                    className="inline-block rounded bg-warning px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#e4a11b] transition duration-150 ease-in-out hover:bg-warning-600 hover:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:bg-warning-600 focus:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:outline-none focus:ring-0 active:bg-warning-700 active:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(228,161,27,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.2),0_4px_18px_0_rgba(228,161,27,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.2),0_4px_18px_0_rgba(228,161,27,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.2),0_4px_18px_0_rgba(228,161,27,0.1)]"
                                >
                                    Request Sent
                                </button>
                            </TERipple>
                        )}

                        {props.user?.incomingFriendRequests.includes(id) && (
                            <>
                                <TERipple>
                                    <button onClick={() => acceptFriend(id)}
                                        type="button"
                                        className="inline-block rounded bg-success px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
                                    >
                                        Accept Friend Request
                                    </button>
                                </TERipple>
                                <TERipple>
                                    <button
                                        type="button"
                                        className="inline-block rounded bg-danger px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]"
                                    >
                                        Reject Friend Request
                                    </button>
                                </TERipple>
                            </>
                        )}

                        {props.user?.friends.includes(id) && (
                            <TERipple>
                                <ConfirmDelete id={id} name={user.firstName} />
                            </TERipple>
                        )}
                    </>
                )}

            </div>

            </div>
            <div className="grid-item"><Bio user={user} /></div>
            <div className="grid-item"></div>
            <div className="grid-item"><FriendsList user={{ firstName: user.firstName, friends: user.friends }} /></div>
            <div className="grid-item">
                <NewPost user={user._id} content='' profile={id} />
                <Posts posts={posts} loggedUser={loggedUser} user={user} /></div>
            {/* <div className="grid-item">7</div>
            <div className="grid-item">8</div> */}
        </div>
    );
};