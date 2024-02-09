import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config";
export const RequireAuth: FC<{ children: React.ReactElement }> = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const navigate = useNavigate();
    const apiUrl =
        process.env.NODE_ENV === "development"
            ? config.development.apiUrl
            : config.production.apiUrl;

    useEffect(() => {
        fetch(`${apiUrl}`, {
            credentials: 'include',
            mode: 'cors'
        })
            .then(response => response.json())
            .then(data => {
                setIsAuth(data.isAuth);

                if (!data.isAuth) {
                    navigate("/login", { state: { from: "dashboard" } });
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });

    }, [navigate]);

    if (!isAuth) {
        return null;
    }

    return children;
};
