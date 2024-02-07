import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TEInput, TERipple } from "tw-elements-react";
// import config from "../config";


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

    // const apiUrl =
    //     process.env.NODE_ENV === "development"
    //         ? config.development.apiUrl
    //         : config.production.apiUrl;

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
        window.location.href = 'http://localhost:4000/auth/google';
    };

    const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files && e.target.files.length > 0 ? e.target.files[0] : null;

        if (selectedFile) {
            setPic(selectedFile);
        }
    };

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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

            const response = await fetch(`http://localhost:4000/register`, {
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
                                {/* <!-- Remember me checkbox --> */}
                                {/* <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                                    <input
                                        className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                        type="checkbox"
                                        value=""
                                        id="exampleCheck2"
                                    />
                                    <label
                                        className="inline-block pl-[0.15rem] hover:cursor-pointer"
                                        htmlFor="exampleCheck2"
                                    >
                                        Remember me
                                    </label>
                                </div> */}

                                {/* <!--Forgot password link--> */}
                                <Link to={"/terms"}>Terms and conditions</Link>
                            </div>

                            {/* <!-- Login button --> */}
                            <div className="text-center lg:text-left">
                                <TERipple rippleColor="light">
                                    <input type="submit" />
                                </TERipple>
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
