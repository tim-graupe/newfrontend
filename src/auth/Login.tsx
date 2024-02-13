import React, { useState } from "react";
import config from "../config";
import { TEInput, TERipple } from "tw-elements-react";
import GoogleButton from 'react-google-button'
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


    //login functions

    const handleGoogleLogin = () => {
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
            body: JSON.stringify({ email: process.env.testEmail, password: process.env.testPassword }),
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
                    {/* <!-- Left column container with background--> */}
                    <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
                        <img
                            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                            className="w-full"
                            alt="Phone"
                        />
                    </div>

                    {/* <!-- Right column container with form --> */}
                    <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
                        <form onSubmit={handleLogin}>

                            {/* <!-- Email input --> */}
                            <TEInput
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                label="Email address"
                                size="lg"
                                className="mb-6"
                            ></TEInput>

                            {/* <!--Password input--> */}
                            <TEInput
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                label="Password"
                                className="mb-6"
                                size="lg"
                            ></TEInput>

                            {/* <!-- Submit button --> */}

                            <TERipple rippleColor="light" className="w-full">
                                <button
                                    onClick={handleLogin}
                                    type="submit"

                                >
                                    Sign in
                                </button>
                            </TERipple>

                            <button
                                type="submit"

                                onClick={handleGuestLogin}
                            >
                                Just visiting? Click here for a guest account
                            </button>
                            {/* <!-- Divider --> */}
                            <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">

                                <p className="mx-4 mb-0 font-semibold text-center dark:text-neutral-200">
                                    OR
                                </p>
                            </div>
                            <GoogleButton
                                onClick={handleGoogleLogin}
                            />


                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}