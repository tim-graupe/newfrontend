import React, { useEffect, useState, ChangeEvent } from "react";
import config from "../config"; import { TETextarea } from "tw-elements-react";
import {
    TEAlert, TERipple, TETabs,
    TETabsContent,
    TETabsItem,
    TETabsPane,
} from "tw-elements-react";
interface NewPostProps {
    user: string,
    profile: string,
    content: string;

}


export const NewPost: React.FC<NewPostProps> = ({ user, profile }) => {
    const [confirmation, setConfirmation] = useState(false);
    const [pic, setPic] = useState<File | null>(null);
    const [content, setContent] = useState<string>("test");

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [basicActive, setBasicActive] = useState("tab1");

    const handleBasicClick = (value: string) => {
        if (value === basicActive) {
            return;
        }
        setBasicActive(value);
    };

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


    const handlePhotoPreview = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files && e.target.files.length > 0 ? e.target.files[0] : null;

        if (selectedFile) {
            setPic(selectedFile);

            // Create a preview URL for the selected image
            const previewURL = URL.createObjectURL(selectedFile);
            setImagePreview(previewURL);
        }
    };

    const submit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            // formData.append("content", content);

            if (pic && pic.name) {
                formData.append("profile_pic", pic);
            }

            const response = await fetch(`http://localhost:4000/user/${profile}/new_img`, {
                mode: "cors",
                method: "POST",
                body: formData,
                credentials: 'include'
            });

            if (!response.ok) {
                console.log(response);
            }

            const data = await response.json();
            console.log(data);
            // setMessage(data.error);
        } catch (error) {
            console.error("Error during fetch:", error);
        }
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
            <div className="mb-3">
                <TETabs pills fill>
                    <TETabsItem
                        onClick={() => handleBasicClick("tab1")}
                        active={basicActive === "tab1"}
                    >
                        New Text Post
                    </TETabsItem>
                    <TETabsItem
                        onClick={() => handleBasicClick("tab2")}
                        active={basicActive === "tab2"}
                    >
                        New Image Post
                    </TETabsItem>
                </TETabs>

                <TETabsContent>
                    <TETabsPane show={basicActive === "tab1"}>            <div className="relative mb-3 xl:w-100">
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
                        </TERipple></TETabsPane>
                    <TETabsPane show={basicActive === "tab2"}>      <div className="mb-3 w-96">
                        {imagePreview && (
                            <img src={imagePreview} alt="preview" className="mb-2" style={{ maxWidth: "100%" }} />
                        )}
                        <label
                            htmlFor="formFile"
                            className="inline-block mb-2 text-neutral-700 dark:text-neutral-200"
                        >
                            Upload new image
                        </label>
                        <input
                            className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                            type="file"
                            id="profile_pic"
                            name='profile_pic'
                            accept='.png, jpg, jpeg'
                            onChange={handlePhotoPreview}

                        />
                        <button
                            type="button"
                            className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                            onClick={submit}
                        >
                            Submit new post
                        </button>
                    </div></TETabsPane>

                </TETabsContent>
            </div>
            {confirmation && (
                <TEAlert staticAlert dismiss open={true} color="bg-success-100 text-success-700">
                    Post successfully sent!
                </TEAlert>
            )}
        </div>

    );
};