import React from "react";
import config from "../../config";
import {
    TEDropdown,
    TEDropdownToggle,
    TEDropdownMenu,
    TEDropdownItem,
    TERipple,
} from "tw-elements-react";
interface FriendReqsProps {
    friendReqsList: any[];
}

export const FriendReqs: React.FC<FriendReqsProps> = ({ friendReqsList }) => {
    const apiUrl =
        process.env.NODE_ENV === "development"
            ? config.development.apiUrl
            : config.production.apiUrl;

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

    const rejectFriend = (_id: string) => {
        fetch(`${apiUrl}/rejectFriendReq/${_id}`, {
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

    return (
        <TEDropdown>
            <TERipple rippleColor="light">
                <TEDropdownToggle className="flex items-center whitespace-nowrap rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                    </svg>
                    <span className="ml-2 [&>svg]:w-5 w-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </span>
                </TEDropdownToggle>
            </TERipple>

            <TEDropdownMenu>
                {friendReqsList.map((req) => (
                    <TEDropdownItem key={req.id}>
                        <div className="horizontal-align">
                            <img
                                src={req.profile_pic}
                                alt="user"
                                className="w-12 rounded-lg shadow-lg black-text"
                            />
                            <p className="black-text">{req.firstName} {req.lastName}</p>
                            <button
                                type="button"
                                className="inline-block rounded bg-primary-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                onClick={() => acceptFriend(req._id)}
                            >
                                Accept
                            </button>
                            <button
                                type="button"
                                className="inline-block rounded bg-primary-accent-200 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                                onClick={() => rejectFriend(req._id)}
                            >
                                Reject
                            </button>
                        </div>
                    </TEDropdownItem>
                ))}

            </TEDropdownMenu>
        </TEDropdown>
    );
};

