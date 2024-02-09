import React, { useState, useEffect } from 'react'
import config from '../../config';
type Props = {
    friend: {
        firstName: string;
        lastName: string;
        profile_pic: string;
    }
}

const ProfilePic = (props: Props) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const apiUrl =
        process.env.NODE_ENV === "development"
            ? config.development.apiUrl
            : config.production.apiUrl;

    useEffect(() => {
        const img = new Image();
        img.src = `${apiUrl}/images/${props.friend.profile_pic}`;
        img.onload = () => {
            setImageLoaded(true);
        };
        img.onerror = () => {
            setImageLoaded(false);
        };
    }, [props.friend.profile_pic]);
    return (
        <div>                <img
            src={imageLoaded ? `${apiUrl}/images/${props.friend.profile_pic}` : props.friend.profile_pic}
            className="w-12 mx-auto mb-4 rounded-full"
            alt={imageLoaded ? 'Loaded Avatar' : 'Default Avatar'}
        /></div>
    )
}

export default ProfilePic