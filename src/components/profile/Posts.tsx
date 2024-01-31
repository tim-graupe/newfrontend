import React from 'react';

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
    user: User
}

interface Props {
    posts: Post[];
}

export const Posts: React.FC<Props> = ({ posts }: Props) => {
    return (
        <div>
            <h2>Posts</h2>
            <ul className="w-96">
                {posts.map((post) => (
                    <li className="w-full py-4 border-b-2 border-opacity-100 border-neutral-100 dark:border-opacity-50" key={post._id}>
                        <p className='text-start'>{post.user.firstName} {post.user.lastName}</p>
                        <img
                            src={post.user.profile_pic}
                            className="w-12 rounded-full" alt="Avatar" />
                        <p className="text-start">{post.content} </p>
                        <p className="text-start">{new Date(post.date_posted).toLocaleString('en-US', {
                            year: '2-digit',
                            month: 'short',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                        })}</p>

                    </li>
                ))}

            </ul>
        </div>
    );
};
