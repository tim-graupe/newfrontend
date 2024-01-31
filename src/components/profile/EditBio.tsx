import React, { useState } from 'react';
import { TEInput, TERipple } from 'tw-elements-react';

interface BioProps {
    user: User;
}

interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    profile_pic: string;
    status: string;
    relationship: string;
    partner: string;
    politics: string;
    high_school: string;
    college: string;
    current_city: string;
    home_town: string;
    occupation: string;
    employer: string;
    dob: Date;
}

const EditBio: React.FC<BioProps> = ({ user }: BioProps) => {
    const handleSubmit = () => {
        // Handle form submission
    };

    return (
        <div className="block max-w-sm rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                    {/* First name input */}
                    <TEInput
                        type="text"
                        label="First name"
                        className="mb-6"
                        value={user.firstName}
                    />

                    {/* Last name input */}
                    <TEInput
                        type="text"
                        label="Last name"
                        className="mb-6"
                        value={user.lastName}
                    />
                </div>

                {/* Email input */}
                <TEInput
                    type="email"
                    label="Email address"
                    className="mb-6"
                    value={user.email}
                />

                {/* Password input */}
                <TEInput
                    type="password"
                    label="Password"
                    className="mb-6"
                    value={user.password}
                />

                {/* Additional TEInput components for other user properties */}


                {/* Submit button */}
                <TERipple rippleColor="light" className="w-full">
                    <button
                        type="submit"
                        className="block w-full rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]]"
                    >
                        Confirm
                    </button>
                </TERipple>
            </form>
        </div>
    );
};

export default EditBio;
