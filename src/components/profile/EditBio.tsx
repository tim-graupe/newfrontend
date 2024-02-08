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
    profile_pic: File | null;
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
    const [firstName, setFirstName] = useState<string>(user.firstName);
    const [lastName, setLastName] = useState<string>(user.lastName);
    const [relationship, setRelationship] = useState<string>(user.relationship);
    const [profile_pic, setPic] = useState<File | null>(null)



    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        switch (name) {
            case 'firstName':
                setFirstName(value);
                break;
            case 'lastName':
                setLastName(value);
                break;
            case 'relationship':
                setRelationship(value);
                break;
            // ... handle other form fields similarly
            default:
                break;
        }
    };

    //may use for drop downs at some point
    // const handleChangeSelect = (
    //     e: ChangeEvent<HTMLSelectElement>
    // ) => {
    //     const { name, value } = e.target;
    //     setFormData((prevData) => ({ ...prevData, [name]: value }));
    // };

    const currentDate = new Date().toISOString().split('T')[0];
    const apiUrl =
        process.env.NODE_ENV === "development"
            ? config.development.apiUrl
            : config.production.apiUrl;

    const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files && e.target.files.length > 0 ? e.target.files[0] : null;

        if (selectedFile) {
            setPic(selectedFile);
        }
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const formData = new FormData();
            formData.append("firstName", firstName);
            formData.append("lastName", lastName);
            formData.append("relationship", relationship);
            // ... other form fields

            if (profile_pic && profile_pic.name) {
                formData.append("profile_pic", profile_pic);
            }

            const response = await fetch(`${apiUrl}/user/${user._id}/bio`, {
                method: "PUT",
                credentials: 'include',
                body: formData,
            });

            if (response.ok) {
                console.log("formData", formData);
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
                <p>Name</p>

                <div className="grid grid-cols-2 gap-4">
                    {/* First name input */}
                    <TEInput
                        name="firstName"
                        type="text"
                        label="First name"
                        className="mb-6"
                        onChange={handleChange}
                    />
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
                <div className="mb-3 w-96">
                    <label
                        htmlFor="formFile"
                        className="inline-block mb-2"
                    >
                        Profile Picture                    </label>
                    <input
                        className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                        type="file"
                        id="profile_pic"
                        name='profile_pic'
                        accept='.png, jpg, jpeg'
                        onChange={handlePhoto}
                    />

                </div>

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
