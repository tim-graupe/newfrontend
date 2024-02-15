import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TEInput, TERipple } from "tw-elements-react";
import config from "../config";


interface RegisterData {
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    dob: string;
    profile_pic: File | null
}

export const Register: React.FC = () => {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [dob, setDob] = useState<string>("");
    const [profile_pic, setPic] = useState<File | null>(null)

    const apiUrl =
        process.env.NODE_ENV === "development"
            ? config.development.apiUrl
            : config.production.apiUrl;

    const jsonData: RegisterData = {
        firstName,
        lastName,
        email,
        password,
        dob,
        profile_pic

    };

    const handleGoogleLogin = () => {
        // Redirect the user to the server-side login route
        window.location.href = `${apiUrl}/auth/google`;
    };

    const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files && e.target.files.length > 0 ? e.target.files[0] : null;

        if (selectedFile) {
            setPic(selectedFile);
        }
    };

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("apiUrl", apiUrl)
        try {
            const formData = new FormData();
            formData.append("firstName", firstName);
            formData.append("lastName", lastName);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("dob", dob);

            if (profile_pic && profile_pic.name) {
                formData.append("profile_pic", profile_pic);
            }

            const response = await fetch(`${apiUrl}/register`, {
                mode: "cors",
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                console.log(response);
            }

            const data = await response.json();
            console.log(data);
            setMessage(data.error);
        } catch (error) {
            console.error("Error during fetch:", error);
        }
    };




    return (
        <section className="h-screen">
            <div className="h-full">
                {/* <!-- Left column container with background--> */}
                <div className="flex flex-wrap items-center justify-center h-full g-6 lg:justify-between">
                    <div className="mb-12 shrink-1 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
                        <img
                            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                            className="w-full"
                            alt="Sample"
                        />
                    </div>

                    {/* <!-- Right column container --> */}
                    <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
                        <form onSubmit={submit} encType="multipart/form-data">                            {/* <!--Sign in section--> */}
                            <div className="flex flex-row items-center justify-center lg:justify-start">
                                <p className="mb-0 mr-4 text-lg">Sign up with</p>

                                <TERipple rippleColor="light">
                                    <button onClick={handleGoogleLogin}
                                        type="button"
                                        className="inline-block rounded px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
                                        style={{ backgroundColor: "#ea4335" }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-4 h-4"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                d="M7 11v2.4h3.97c-.16 1.029-1.2 3.02-3.97 3.02-2.39 0-4.34-1.979-4.34-4.42 0-2.44 1.95-4.42 4.34-4.42 1.36 0 2.27.58 2.79 1.08l1.9-1.83c-1.22-1.14-2.8-1.83-4.69-1.83-3.87 0-7 3.13-7 7s3.13 7 7 7c4.04 0 6.721-2.84 6.721-6.84 0-.46-.051-.81-.111-1.16h-6.61zm0 0 17 2h-3v3h-2v-3h-3v-2h3v-3h2v3h3v2z"
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </TERipple>
                            </div>

                            {/* <!-- Separator between social media sign in and email/password sign in --> */}
                            <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                                <p className="mx-4 mb-0 font-semibold text-center dark:text-white">
                                    Or
                                </p>
                            </div>
                            <p>Profile Picture</p>
                            <input
                                type="file"
                                accept=".png, .jpg, .jpeg"
                                name="profile_pic"
                                onChange={handlePhoto}
                            />

                            {/* Name input */}
                            <TEInput type="text"
                                label="First Name"
                                size="lg"
                                className="mb-6"
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <TEInput type="text"
                                label="Last Name"
                                size="lg"
                                className="mb-6"
                                onChange={(e) => setLastName(e.target.value)}
                            />

                            {/* <!-- Email input --> */}
                            <TEInput
                                type="email"
                                label="Email address"
                                size="lg"
                                className="mb-6"
                                onChange={(e) => setEmail(e.target.value)}
                            ></TEInput>

                            {/* <!--Password input--> */}
                            <TEInput
                                type="password"
                                label="Password"
                                className="mb-6"
                                onChange={(e) => setPassword(e.target.value)}
                                size="lg"
                            ></TEInput>

                            <div className="flex items-center justify-between mb-6">


                                {/* <!--Forgot password link--> */}
                            </div>

                            {/* <!-- Login button --> */}
                            <div className="text-center lg:text-left">
                                <TERipple rippleColor="light">
                                    <button
                                        type="submit"
                                        className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                    >
                                        Register
                                    </button>                                </TERipple>
                                <p>{message}</p>
                                {/* <!-- Register link --> */}
                                <p className="pt-1 mt-2 mb-0 text-sm font-semibold">
                                    Have an account?{" "}
                                    <Link to={"/login"}

                                        className="transition duration-150 ease-in-out text-danger hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                                    >
                                        Login
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};
