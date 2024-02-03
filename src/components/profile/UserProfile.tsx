import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TERipple } from "tw-elements-react";
import "./style.css"
// import { Bio } from "./userDash/bio";
// import { FriendsList } from "./userDash/friendsList";
// import { Timeline } from "./userDash/timeline";
// import { NavBar } from "./nav";
// import { NewPost } from "./newPost";
import config from "../../config";
import Bio from "./Bio";
import { FriendsList } from "./FriendsList";
import { Posts } from "./Posts";
// import { GroupList } from "./profileGroupList";

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
            fetch(`http://localhost:4000/user/${id}/posts`, {
                credentials: "include",
            })
                .then((res) => res.json())
                .then((res) => setPosts(res));
            setIsLoading(false);
        };

        getUserPosts();
    }, [apiUrl, id]);

    async function getUser() {
        try {
            const response = await fetch(`${apiUrl}`, {
                credentials: "include",
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    }

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

        fetchUser();
    }, [apiUrl, id]);

    return (
        <div className="grid-container">
            <div className="grid-item">    <div className="text-center">
                <img
                    src={user.profile_pic}
                    className="w-32 mx-auto mb-4 rounded-lg"
                    alt="Avatar" />
                <h5 className="mb-2 text-xl font-medium leading-tight">{user.firstName} {user.lastName}</h5>
                {id !== props.user?._id && (
                    <>
                        {!props.user?.outgoingFriendRequests.includes(id) && (
                            <TERipple>
                                <button
                                    onClick={addFriend}
                                    type="button"
                                    className="inline-block rounded border-2 border-success px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-success transition duration-150 ease-in-out hover:border-success-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-success-600 focus:border-success-600 focus:text-success-600 focus:outline-none focus:ring-0 active:border-success-700 active:text-success-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                                >
                                    Add Friend
                                </button>
                            </TERipple>
                        )}

                        {props.user?.outgoingFriendRequests.includes(id) && (
                            <TERipple>
                                <button
                                    type="button"
                                    className="inline-block rounded border-2 border-warning px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-warning transition duration-150 ease-in-out hover:border-warning-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-warning-600 focus:border-warning-600 focus:text-warning-600 focus:outline-none focus:ring-0 active:border-warning-700 active:text-warning-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                                >
                                    Request Sent
                                </button>
                            </TERipple>
                        )}

                        {props.user?.incomingFriendRequests.includes(id) && (
                            <>
                                <TERipple>
                                    <button
                                        type="button"
                                        className="inline-block rounded border-2 border-success px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-success transition duration-150 ease-in-out hover:border-success-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-success-600 focus:border-success-600 focus:text-success-600 focus:outline-none focus:ring-0 active:border-success-700 active:text-success-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                                    >
                                        Accept Friend Request
                                    </button>
                                </TERipple>
                                <TERipple>
                                    <button
                                        type="button"
                                        className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                                    >
                                        Reject Friend Request
                                    </button>
                                </TERipple>
                            </>
                        )}

                        {props.user?.friends.includes(id) && (
                            <TERipple>
                                <button onClick={deleteFriend}
                                    type="button"
                                    className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                                >
                                    Remove Friend
                                </button>
                            </TERipple>
                        )}
                    </>
                )}

            </div>

            </div>
            <div className="grid-item"><Bio user={user} /></div>
            <div className="grid-item">3</div>
            <div className="grid-item"><FriendsList user={{ firstName: user.firstName, friends: user.friends }} /></div>
            <div className="grid-item"><Posts posts={posts} /></div>
            <div className="grid-item">7</div>
            <div className="grid-item">8</div>
        </div>
    );
};
