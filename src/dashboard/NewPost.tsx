import React, { useEffect, useState, ChangeEvent } from "react";
import config from "../config"; import { TETextarea } from "tw-elements-react";

interface NewPostProps {
    user: string,
    profile: string,
    content: string

}


export const NewPost: React.FC<NewPostProps> = ({ user, profile }) => {
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
            const response = await fetch(`http://localhost:4000/user/${profile}/new_post`, {
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
        <div className="post-container">
            <br />
            <br />
            <div className="relative mb-3 xl:w-96">
                <TETextarea
                    id="content"
                    name="content"
                    label="New Post"
                    rows={4}
                    value={formData.content}
                    onChange={handleChange}
                ></TETextarea>


            </div>
            <button
                onClick={(e) => {
                    handleClick();
                    showFloatingMessage(e);
                }}
            >
                Submit
            </button>
            <div id="post-sent-message" className="post-sent-message hide">
                Post sent!
            </div>
        </div>
    );
};