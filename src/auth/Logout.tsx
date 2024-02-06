import React, { useEffect } from 'react';
import config from '../config';

type Props = {};

export const Logout = (props: Props) => {
    const apiUrl =
        process.env.NODE_ENV === 'development'
            ? config.development.apiUrl
            : config.production.apiUrl;

    useEffect(() => {
        const logoutUrl = `${apiUrl}/logout`;

        fetch(logoutUrl, { method: 'GET', credentials: 'include' })
            .then((response) => {
                if (response.ok) {
                    window.location.href = '/';
                } else {
                    console.error('Logout failed');
                    window.location.href = '/';
                }
            })
            .catch((error) => {
                console.error('Error during logout:', error);
                window.location.href = '/';
            });
    }, []);

    return <div>Logging out...</div>;
};
