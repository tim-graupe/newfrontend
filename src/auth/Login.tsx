import React, { useState } from "react";
import { TERipple } from "tw-elements-react";
import GoogleButton from 'react-google-button';
import config from "../config";

export default function Login(): JSX.Element {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const jsonData = {
        email: email,
        password: password,
    };

    const apiUrl =
        process.env.NODE_ENV === "development"
            ? config.development.apiUrl
            : config.production.apiUrl;

    const handleGoogleLogin = () => {
        // Redirect the user to the server-side login route
        window.location.href = `${apiUrl}/auth/google`;
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        fetch(`${apiUrl}/login`, {
            method: "POST",
            mode: 'cors',
            credentials: 'include',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(jsonData),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.error) {
                    console.log(data);
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    const handleGuestLogin = (e: React.FormEvent) => {
        e.preventDefault();
        fetch(`${apiUrl}/login`, {
            method: "POST",
            mode: 'cors',
            credentials: 'include',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: "test@test.com", password: "testtest" }),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.error) {
                    console.log(data);
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <section className="h-screen">
            <div className="container h-full px-6 py-24">
                <div className="flex flex-wrap items-center justify-center h-full g-6 lg:justify-between">
                    <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
                        <img
                            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                            className="w-full"
                            alt="Phone"
                        />
                    </div>
                    <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
                        <form onSubmit={handleLogin}>
                            <div>
                                {/* ... Email input and Password input components */}
                            </div>
                            <TERipple rippleColor="light" className="w-full">
                                <button
                                    type="submit"
                                    className="inline-block w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                >
                                    Sign in
                                </button>
                            </TERipple>
                            {/* ... Guest login button */}
                            <GoogleButton onClick={handleGoogleLogin} />
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
