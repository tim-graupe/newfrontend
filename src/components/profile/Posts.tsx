import React, { useState, ChangeEvent } from 'react';
import config from '../../config';
import { TERipple, TEInput } from "tw-elements-react";
import { redirect } from 'react-router-dom';
import { Comment } from './Comment';
import "./style.css"
import { ConfirmDeletePost } from './ConfirmDeletePost';
import ProfilePic from './ProfilePic';
interface User {
    _id: string;
    firstName: string;
    lastName: string;
    profile_pic: string;
}

interface Post {
    _id: string;
    content: string;
    date_posted: string;
    type: string;
    pic: string;
    user: User;
    comments: Array<string>
    likes: Array<string>
}

interface NewCommentProps {
    user: User,
    profile: string,
    content: string

}
interface Props {
    posts: Post[];
    loggedUser: {
        _id: string
        firstName: string
    }
    user: User
}

export const Posts: React.FC<Props> = ({ posts, loggedUser, user }) => {

    const [formData, setFormData] = useState<NewCommentProps>({
        user: user,
        content: '',
        profile: 'profile'
    });

    const apiUrl =
        process.env.NODE_ENV === "development"
            ? config.development.apiUrl
            : config.production.apiUrl;

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const likePost = async (_id: string) => {
        try {
            const response = await fetch(`${apiUrl}/likePost/${_id}/`, {
                method: "POST",
                mode: "cors",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    postId: _id,
                }),
            });

            if (!response.ok) {
                throw new Error(`Error liking post (Status: ${response.status})`);
            }

            console.log(`Like sent successfully for post ${_id}`);
        } catch (error) {
            console.error(error);
        }
    };

    const commentOnPost = (_id: string) => {
        console.log(formData.content)
        fetch(`${apiUrl}/commentOnPost/${_id}`, {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                postId: _id,
                comment: formData.content,
                date: new Date(),
            }),
        });
    };


    return (
        <div>
            <h4 className="mt-0 mb-2 text-2xl font-medium leading-tight text-primary">{`${user.firstName}'s Wall`}</h4>
            <ol className="border-l-2 border-primary dark:border-primary-500">
                {posts
                    .sort((a, b) => new Date(b.date_posted).getTime() - new Date(a.date_posted).getTime())
                    .map((post) => {
                        return (
                            <li key={post._id}>
                                <div className="flex items-center flex-start">
                                    {loggedUser._id === post.user._id ? <div className="-ml-[9px] -mt-2 mr-3 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 dark:bg-red-600"
                                    >


                                        <ConfirmDeletePost id={post._id} />

                                    </div> :
                                        <div className="-ml-[9px] -mt-2 mr-3 flex h-4 w-4 items-center justify-center rounded-full bg-primary dark:bg-primary-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>



                                        </div>
                                    }

                                    <ProfilePic friend={post.user} />

                                    <h4 className="-mt-2 text-xl font-semibold">     {post.user.firstName} {post.user.lastName}</h4>
                                </div>
                                <div className="pb-6 mb-6 ml-6 text-start">
                                    <a
                                        href="#!"
                                        className="text-sm transition duration-150 ease-in-out text-primary hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                                    >
                                        {new Date(post.date_posted).toLocaleString('en-US', {
                                            year: '2-digit',
                                            month: 'short',
                                            day: 'numeric',
                                            hour: 'numeric',
                                            minute: 'numeric',
                                        })}
                                    </a>
                                    {post.type === "post" || post.type === "newFriend" ? (
                                        <p className="mt-2 mb-4 text-neutral-600 dark:text-neutral-300">
                                            {post.content}
                                        </p>
                                    ) : (
                                        <img src={`${apiUrl}/images/${post.pic}`} alt={`${post.user.firstName}'s post`} />
                                    )}

                                    <TERipple rippleColor="light">
                                        <button onClick={(e) => likePost(post._id)}
                                            type="button"
                                            className="inline-block rounded bg-primary px-4 pb-[5px] pt-[6px] text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                        >
                                            Like
                                        </button>
                                    </TERipple>
                                    <div className="mb-3 md:w-96">
                                        <div className="relative flex flex-wrap items-stretch w-full mb-4">
                                            <input value={formData.content}
                                                onChange={handleChange}
                                                type="text"
                                                name='content'
                                                className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                                                placeholder="Reply"
                                                aria-label="Reply"
                                                aria-describedby="button-addon1" />

                                            <TERipple color='light'>
                                                <button onClick={() => commentOnPost(post._id)}
                                                    type="button"
                                                    className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                                >
                                                    Submit
                                                </button>
                                            </TERipple>
                                        </div>

                                    </div>
                                </div>
                                <sub>
                                    {post.comments.length === 1
                                        ? `${post.comments.length} comment`
                                        : `${post.comments.length} comments`}
                                </sub>{" "}
                                <sub>
                                    {post.likes.length === 1
                                        ? `${post.likes.length} like`
                                        : `${post.likes.length} likes`}
                                </sub>
                                <sub> {new Date(post.date_posted).toLocaleString('en-US', {
                                    year: '2-digit',
                                    month: 'short',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                })}</sub>
                                <div className="comments-container">
                                    {post.comments.length > 0 ? <Comment comments={post.comments} /> : null}
                                </div>
                            </li>
                        )
                    })}
            </ol>
        </div >
    );
};


