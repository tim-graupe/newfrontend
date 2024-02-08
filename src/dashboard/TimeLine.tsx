import React, { useEffect, useState, ChangeEvent } from "react";
import config from "../config";
import { Comment } from "../components/profile/Comment";
import { TERipple, TEInput } from "tw-elements-react";
import ProfilePic from "../components/profile/ProfilePic";

interface TimelineProps {
    userId: string;
}

interface NewCommentProps {
    user: string,
    profile: string,
    content: string

}


//used on the user dash to show user's posts
const Timeline: React.FC<TimelineProps> = ({ userId }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState<any[]>([]);
    const [formData, setFormData] = useState<NewCommentProps>({
        user: 'user',
        content: '',
        profile: 'profile'
    });


    const apiUrl =
        process.env.NODE_ENV === "development"
            ? config.development.apiUrl
            : config.production.apiUrl;


    useEffect(() => {
        const getPosts = () => {
            if (userId) {
                fetch(`${apiUrl}/getFriendsPosts/${userId}`, {
                    credentials: "include",
                })
                    .then((res) => res.json())
                    .then((res) => {
                        setPosts(res);
                        setIsLoading(false);
                    });
            }
        };

        getPosts();
        setIsLoading(false);
    }, [userId]);

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


    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    return (
        <div className="timeline-container">
            <ol className="border-l-2 border-primary dark:border-primary-500">
                {posts
                    .sort((a, b) => new Date(b.date_posted).getTime() - new Date(a.date_posted).getTime())
                    .map((post) => {
                        return (
                            <li key={post._id} className="mb-6">
                                <div className="flex items-center flex-start">
                                    <div className="-ml-[9px] -mt-2 mr-3 flex h-4 w-4 items-center justify-center rounded-full bg-primary dark:bg-primary-500"></div>
                                    <ProfilePic friend={post.user} />
                                    <h4 className="ml-2 -mt-2 text-xl font-semibold whitespace-nowrap">
                                        {post.user.firstName} {post.user.lastName}
                                        {post.user._id !== post.profile._id && (
                                            <>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="inline-block w-6 h-6 ml-1"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                                                    />
                                                </svg>
                                                {post.profile.firstName} {post.profile.lastName}
                                            </>
                                        )}
                                    </h4>
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
                                    <p className="mt-2 mb-4 text-neutral-600 dark:text-neutral-300">
                                        {post.content}
                                    </p>
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
                                    {post.comments.length > 0 && (
                                        <div className="comments-container">
                                            <Comment comments={post.comments} />
                                        </div>
                                    )}
                                </div>
                            </li>
                        )
                    })}
            </ol>
        </div>
    );
};

export default Timeline;
