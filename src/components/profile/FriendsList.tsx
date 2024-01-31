import React, { useState } from 'react';


interface FriendsListI {
    firstName: string;
    friends?: Array<string>;
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
        </div>
    );
};
