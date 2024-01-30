import React, { useEffect, useState } from "react";
// import { Post } from "../postComponent";
import config from "../config";

interface TimelineProps {
    props: string; // Assuming props is a string, adjust the type accordingly
}

const Timeline: React.FC<TimelineProps> = ({ props }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState<any[]>([]); // Change any[] to the actual type of posts
    const apiUrl =
        process.env.NODE_ENV === "development"
            ? config.development.apiUrl
            : config.production.apiUrl;

    useEffect(() => {
        const getPosts = () => {
            if (props) {
                fetch(`${apiUrl}/user/${props}/posts`, {
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
    }, [props, apiUrl]);

    return (
        <div className="timeline-container">
            {!props ? (
                <p>Loading please wait...</p>
            ) : (
                <div>
                    {posts.map((post) => (
                        <div key={post._id}>
                            {/* <Post props={post} /> */}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Timeline;
