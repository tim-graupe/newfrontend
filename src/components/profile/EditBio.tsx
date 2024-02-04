import React, { useState, ChangeEvent, FormEvent } from 'react';
import { TEInput, TERipple } from 'tw-elements-react';
import config from '../../config';

interface BioProps {
    user: User;

}

interface User {
    _id: string;
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
    const [formData, setFormData] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        profile_pic: user.profile_pic,
        relationship: user.relationship,
        partner: user.partner,
        politics: user.politics,
        high_school: user.high_school,
        college: user.college,
        current_city: user.current_city,
        home_town: user.home_town,
        occupation: user.occupation,
        employer: user.employer,
        dob: user.dob
    });


    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleChangeSelect = (
        e: ChangeEvent<HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const currentDate = new Date().toISOString().split('T')[0];
    const apiUrl =
        process.env.NODE_ENV === "development"
            ? config.development.apiUrl
            : config.production.apiUrl;

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        try {
            const response = await fetch(`${apiUrl}/user/${user._id}/bio`, {
                method: "PUT",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log("formData", formData)
            } else {
                const error = await response.json();
                console.log(error);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="block max-w-sm rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                    {/* First name input */}
                    <TEInput
                        name="firstName"
                        type="text"
                        label="First name"
                        className="mb-6"
                        onChange={handleChange}
                    />

                    {/* Last name input */}
                    <TEInput
                        type="text"
                        name='lastName'
                        label="Last name"
                        className="mb-6"
                        onChange={handleChange}

                    />
                </div>

                <p>Birthday</p>
                <TEInput
                    type="date"
                    name="dob"
                    className="shadow-none form-control"
                    aria-describedby="button-addon2"
                    onChange={handleChange}

                    max={currentDate}
                />
                <p>Relationship Status</p>
                <TEInput
                    type="text"
                    name='relationship'
                    // label="Relationship"
                    className="mb-6"
                    onChange={handleChange}

                />
                <p>Home Town</p>
                <TEInput
                    type="text"
                    name="home_town"
                    onChange={handleChange}

                />
                <p>Current City</p>
                <TEInput
                    type="text"
                    name="current_city"
                    onChange={handleChange}

                />
                <p>High School</p>
                <TEInput
                    type="text"
                    name="high_school"
                    onChange={handleChange}

                />
                <p>College</p>
                <TEInput
                    type="text"
                    name="college"
                    onChange={handleChange}

                />

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
