import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TECollapse, TERipple } from "tw-elements-react";
interface CommentObject {
    _id: string;
    comment: string;
    pic: string;
    user: {
        firstName: string;
        lastName: string;
        _id: string
    }
    date_posted: string
}

interface CommentProps {
    comments: Array<string | CommentObject>;
}

export const Comment: React.FC<CommentProps> = ({ comments }: CommentProps) => {
    const [activeElement, setActiveElement] = useState("");

    const handleClick = (value: string) => {
        if (value === activeElement) {
            setActiveElement("");
        } else {
            setActiveElement(value);
        }
    };

    return (
        <>
            <div id="accordionExample">
                <div className="bg-white border rounded-t-lg border-neutral-200 dark:border-neutral-600 dark:bg-neutral-800">
                    <h2 className="mb-0" id="headingOne">
                        <button
                            className={`${activeElement === "element1" &&
                                `text-primary [box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:!text-primary-400 dark:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]`
                                } group relative flex w-full items-center rounded-t-[15px] border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white`}
                            type="button"
                            onClick={() => handleClick("element1")}
                            aria-expanded="true"
                            aria-controls="collapseOne"
                        >
                            {activeElement === "" ? "Show " : "Hide "}
                            Comments
                            <span
                                className={`${activeElement === "element1"
                                    ? `rotate-[-180deg] -mr-1`
                                    : `rotate-0 fill-[#212529]  dark:fill-white`
                                    } ml-auto h-5 w-5 shrink-0 fill-[#336dec] transition-transform duration-200 ease-in-out motion-reduce:transition-none dark:fill-blue-300`}
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
                                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                    />
                                </svg>
                            </span>
                        </button>
                    </h2>
                    <TECollapse
                        show={activeElement === "element1"}
                        className="!mt-0 !rounded-b-none !shadow-none"
                    >
                        <div className="px-5 py-4">
                            {comments
                                .sort((a, b) => {
                                    const dateA = typeof a === 'string' ? new Date() : new Date(a.date_posted);
                                    const dateB = typeof b === 'string' ? new Date() : new Date(b.date_posted);
                                    return dateB.getTime() - dateA.getTime();
                                }).
                                map((comment, index) => (
                                    <div key={index}>
                                        {typeof comment === 'string' ? (
                                            <p>{comment}</p>
                                        ) : (
                                            <ol className="border-l-2 border-info-100">
                                                <li className='w-full'>
                                                    <div>
                                                        <div className="-ml-[13px] flex h-[25px] w-[25px] items-center justify-center rounded-full bg-info-100 text-info-700">
                                                            <img
                                                                src={comment.pic}
                                                                alt='commenter'
                                                                className="w-32 rounded-full"
                                                            >

                                                            </img>
                                                        </div>
                                                        <div className="block max-w-md p-6 mb-10 ml-6 rounded-lg shadow-md bg-neutral-50 shadow-black/5 dark:bg-neutral-700 dark:shadow-black/10">
                                                            <div className="flex justify-between mb-4">
                                                                <Link
                                                                    to={`/user/${comment.user._id}`}
                                                                    className="text-sm transition duration-150 ease-in-out text-primary hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                                                                >
                                                                    {comment.user.firstName} {comment.user.lastName}
                                                                </Link>
                                                                <Link to={`/user/${comment.user._id}`}

                                                                    className="text-sm transition duration-150 ease-in-out text-primary hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                                                                >
                                                                    {new Date(comment.date_posted).toLocaleString('en-US', {
                                                                        year: '2-digit',
                                                                        month: 'short',
                                                                        day: 'numeric',
                                                                        hour: 'numeric',
                                                                        minute: 'numeric',
                                                                    })}
                                                                </Link>
                                                            </div>
                                                            <p className="mb-6 text-neutral-700 dark:text-neutral-200 text-start">
                                                                {comment.comment}
                                                            </p>
                                                            <TERipple rippleColor="light">
                                                                <button
                                                                    type="button"
                                                                    className="inline-block rounded bg-primary px-4 pb-[5px] pt-[6px] text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"

                                                                >
                                                                    Like
                                                                </button>
                                                            </TERipple>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ol>
                                        )}
                                    </div>
                                ))}
                        </div>
                    </TECollapse>
                </div>

            </div>
        </>
    );
}



