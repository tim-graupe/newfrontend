import React, { useEffect, useState, ChangeEvent } from "react";
import config from "../config"; import { TETextarea } from "tw-elements-react";
import { TEAlert, TERipple } from "tw-elements-react";
interface NewPostProps {
    user: string,
    profile: string,
    content: string

}


export const NewPost: React.FC<NewPostProps> = ({ user, profile }) => {
    const [confirmation, setConfirmation] = useState(false)

    const [formData, setFormData] = useState<NewPostProps>({
        user: user,
        content: '',
        profile: profile
    });
    const apiUrl =
        process.env.NODE_ENV === "development"
            ? config.development.apiUrl
            : config.production.apiUrl;


    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };





    const handleClick = async () => {
        try {
            const response = await fetch(`${apiUrl}/user/${profile}/new_post`, {
                method: "POST",
                mode: "cors",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    content: formData.content,
                    date: new Date(),
                    user: formData.user,
                    profile: profile
                }),
            });

            if (response.ok) {
                console.log('ok!')
            } else {
                console.error("Failed to submit post:", response.status, response.statusText);
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };



    const showFloatingMessage = (e: React.MouseEvent<HTMLButtonElement>) => {
        const message = document.getElementById("post-sent-message");
        message?.classList.remove("hide");
        const buttonRect = e.currentTarget.getBoundingClientRect();
        if (message) {
            message.style.top = `${buttonRect.top}px`;
            message.style.left = `${buttonRect.left}px`;

            setTimeout(() => {
                message.classList.add("hide");
            }, 2000);
        }
    };

    return (
        <div className="new-post-container">
            <br />
            <br />
            <div className="relative mb-3 xl:w-100">
                <TETextarea
                    id="content"
                    name="content"
                    label="New Post"
                    rows={4}
                    value={formData.content}
                    onChange={handleChange}
                ></TETextarea>
            </div>
            <TERipple rippleColor="light">
                <button
                    onClick={(e) => {
                        handleClick();
                        setConfirmation(true);
                    }}
                    type="button"
                    className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                >
                    Submit New Post
                </button>
            </TERipple>
            {confirmation && (
                <TEAlert staticAlert dismiss open={true} color="bg-success-100 text-success-700">
                    Post successfully sent!
                </TEAlert>
            )}
        </div>

    );
};