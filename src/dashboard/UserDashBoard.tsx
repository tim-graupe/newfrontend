import React, { useEffect, useState } from 'react';
import { NewPost } from './NewPost';
import Timeline from './TimeLine';

interface User {
    firstName: string;
    lastName: string;
    _id: string;
}

interface Props {
    user: User | null;
}

export const UserDashBoard: React.FC<Props> = (props) => {
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        const currentHour = new Date().getHours();

        if (currentHour >= 5 && currentHour < 12) {
            setGreeting('Good morning');
        } else if (currentHour >= 12 && currentHour < 18) {
            setGreeting('Good afternoon');
        } else {
            setGreeting('Good evening');
        }
    }, []);
    const { user } = props;

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h4 className="mt-0 mb-2 text-2xl font-medium leading-tight text-center text-primary">
                {greeting}, {user.firstName}!
            </h4>

            <NewPost user={user._id} content='' profile={user._id} />
            <Timeline userId={user._id} />
        </div>

    );
};
