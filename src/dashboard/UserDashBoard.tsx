import React, { useEffect, useState } from 'react';

interface User {
    firstName: string;
    lastName: string;
    _id: number;
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
        // If user is null, you might want to handle this case or return alternative content
        return <div>Loading...</div>;
    }

    return (
        <div>
            {greeting}, {user.firstName}!
        </div>
    );
};
