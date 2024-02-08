import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProfilePic from './ProfilePic';


interface FriendsListI {
    firstName: string;
    friends?: Array<{ _id: string, firstName: string, lastName: string, profile_pic: string }>;
}

interface Props {
    user?: FriendsListI
}

export const FriendsList: React.FC<Props> = ({ user }: Props) => {
    if (!user) {
        return <p>Loading...</p>;
    }

    const { friends, firstName } = user!;

    return (
        <div>
            <h6 className="mt-0 mb-2 text-base font-medium leading-tight text-primary">
                {firstName}'s {friends?.length} Friends
            </h6>
            {friends?.map((friend) => {
                return <Link to={`/user/${friend._id}`} className="text-center" key={friend._id}>
                    <ProfilePic friend={friend} />
                    <p className="text-neutral-500 dark:text-neutral-400">{friend.firstName} {friend.lastName}</p>
                </Link>
            })}
        </div>
    );
};
