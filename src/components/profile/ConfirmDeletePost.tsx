import React, { useState } from "react";
import {
    TERipple,
    TEModal,
    TEModalDialog,
    TEModalContent,
    TEModalHeader,
    TEModalBody,
    TEModalFooter,
} from "tw-elements-react";
import config from "../../config";

interface ConfirmDeletePostProps {
    id: string;
}


export const ConfirmDeletePost: React.FC<ConfirmDeletePostProps> = (props) => {
    const [showModal, setShowModal] = useState(false);
    const apiUrl =
        process.env.NODE_ENV === "development"
            ? config.development.apiUrl
            : config.production.apiUrl;


    const deletePost = async (id: string) => {
        try {
            const response = await fetch(`${apiUrl}/delete/post/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Post successfully deleted", data);
        } catch (error) {
            console.error('Error!!!!!:', error);
        }
    };


    return (
        <div>
            {/* <!-- Button trigger modal --> */}

            <button
                type="button"
                onClick={() => setShowModal(true)}
            >
                x
            </button>

            {/* <!-- Modal --> */}
            <TEModal show={showModal} setShow={setShowModal}>
                <TEModalDialog>
                    <TEModalContent>
                        <TEModalHeader>
                            {/* <!--Modal title--> */}
                            <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                                Confirmation Needed!                            </h5>
                            {/* <!--Close button--> */}
                            <button
                                type="button"
                                className="box-content border-none rounded-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                                onClick={() => setShowModal(false)}
                                aria-label="Close"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </TEModalHeader>
                        {/* <!--Modal body--> */}
                        <TEModalBody>Are you sure you want to delete this post?</TEModalBody>
                        <TEModalFooter>
                            <TERipple rippleColor="light">
                                <button
                                    type="button"
                                    className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                            </TERipple>
                            <TERipple rippleColor="light">
                                <button onClick={() => { deletePost(props.id); setShowModal(false); }} type="button"
                                    className="ml-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                >
                                    Confirm
                                </button>
                            </TERipple>
                        </TEModalFooter>
                    </TEModalContent>
                </TEModalDialog>
            </TEModal>
        </div>
    );
}