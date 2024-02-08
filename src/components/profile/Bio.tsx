import React, { useState, useEffect } from 'react';
import {
    TECollapse, TERipple,
    TEModal,
    TEModalDialog,
    TEModalContent,
    TEModalHeader,
    TEModalBody,
    TEModalFooter,
} from 'tw-elements-react';
import EditBio from './EditBio';

interface BioProps {
    user: User;
}

interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    profile_pic: File;
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

const Bio: React.FC<BioProps> = ({ user }: BioProps) => {
    const [showModal, setShowModal] = useState(false);
    const [activeElement, setActiveElement] = useState("");
    const [userId, setUserId] = useState('')

    const handleClick = (value: string) => {
        if (value === activeElement) {
            setActiveElement("");
        } else {
            setActiveElement(value);
        }
    };

    useEffect(() => {
        const getUserPosts = () => {
            fetch(`http://localhost:4000/`, {
                credentials: "include",
            })
                .then((res) => res.json())
                .then((res) => setUserId(res.user._id));
        };

        getUserPosts();
    }, []);

    return (
        <>
            <h4 className="mt-0 mb-2 text-2xl font-medium leading-tight text-primary">
                About {user.firstName}  {user._id === userId ? <div>
                    {/* <!-- Button trigger modal --> */}
                    <TERipple rippleColor="white">
                        <button
                            type="button"
                            className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                            onClick={() => setShowModal(true)}
                        >
                            Edit Details
                        </button>
                    </TERipple>

                    {/* <!-- Modal --> */}
                    <TEModal show={showModal} setShow={setShowModal}>
                        <TEModalDialog>
                            <TEModalContent>
                                <TEModalHeader>
                                    {/* <!--Modal title--> */}
                                    <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                                        Edit Info
                                    </h5>
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
                                <TEModalBody><EditBio user={user} /></TEModalBody>
                                <TEModalFooter>
                                    <TERipple rippleColor="light">
                                        <button
                                            type="button"
                                            className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                                            onClick={() => setShowModal(false)}
                                        >
                                            Close
                                        </button>
                                    </TERipple>

                                </TEModalFooter>
                            </TEModalContent>
                        </TEModalDialog>
                    </TEModal>
                </div> : null}          </h4>
            <div id="accordionExample">
                <div className="bg-white border border-t-0 border-l-0 border-r-0 rounded-none border-neutral-200 dark:border-neutral-600 dark:bg-neutral-800">
                    <h2 className="mb-0" id="headingOne">
                        <button
                            className={`${activeElement === "element1" &&
                                `text-primary [box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:!text-primary-400 dark:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]`
                                } group relative flex w-full items-center rounded-none border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white`}
                            type="button"
                            onClick={() => handleClick("element1")}
                            aria-expanded="true"
                            aria-controls="collapseOne"
                        >
                            Personal
                            <span
                                className={`${activeElement === "element1"
                                    ? `rotate-[-180deg] -mr-1`
                                    : `rotate-0 fill-[#212529] dark:fill-white`
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
                            {/* <strong>Birthday: </strong> <p>{user.dob}</p> */}
                            <strong>Home Town:</strong> <p>{user.home_town}</p>
                            <strong>Current City:</strong> <p>{user.current_city}</p>
                            <strong>Relationship:</strong> <p>{user.relationship}</p>
                            <strong>Politics: </strong> <p>{user.politics}</p>
                            <strong>Occupation: </strong> <p>{user.occupation} at {user.employer}</p>
                        </div>
                    </TECollapse>
                </div>
            </div>
            <div className="bg-white border border-t-0 border-l-0 border-r-0 rounded-none border-neutral-200 dark:border-neutral-600 dark:bg-neutral-800">
                <h2 className="mb-0" id="headingTwo">
                    <button
                        className={`${activeElement === "element2" &&
                            `text-primary [box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:!text-primary-400 dark:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]`
                            } group relative flex w-full items-center rounded-none border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white`}
                        type="button"
                        onClick={() => handleClick("element2")}
                        aria-expanded="true"
                        aria-controls="collapseOne"
                    >
                        Education
                        <span
                            className={`${activeElement === "element2"
                                ? `rotate-[-180deg] -mr-1`
                                : `rotate-0 fill-[#212529] dark:fill-white`
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
                    show={activeElement === "element2"}
                    className="!mt-0 !rounded-b-none !shadow-none"
                >
                    <div className="px-5 py-4">
                        <strong>High School:</strong> <p>{user.high_school}</p>
                        <strong>College:</strong> <p>{user.college}</p>
                    </div>
                </TECollapse>
            </div>
            {/* <div className="bg-white border border-t-0 border-b-0 border-l-0 border-r-0 rounded-none border-neutral-200 dark:border-neutral-600 dark:bg-neutral-800">
                <h2 className="mb-0 accordion-header" id="headingThree">
                    <button
                        className={`${activeElement === "element3"
                            ? `text-primary [box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:!text-primary-400 dark:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]`
                            : `transition-none rounded-b-[15px]`
                            } group relative flex w-full items-center rounded-none border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white`}
                        type="button"
                        onClick={() => handleClick("element3")}
                        aria-expanded="true"
                        aria-controls="collapseOne"
                    >
                        Accordion Item #3
                        <span
                            className={`${activeElement === "element3"
                                ? `rotate-[-180deg] -mr-1`
                                : `rotate-0 fill-[#212529] dark:fill-white`
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
                    show={activeElement === "element3"}
                    className="!mt-0 !shadow-none"
                >
                    <div className="px-5 py-4">
                        <strong>This is the third item's accordion body.</strong> Lorem
                        ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eu
                        rhoncus purus, vitae tincidunt nibh. Vivamus elementum egestas
                        ligula in varius. Proin ac erat pretium, ultricies leo at, cursus
                        ante. Pellentesque at odio euismod, mattis urna ac, accumsan metus.
                        Nam nisi leo, malesuada vitae pretium et, laoreet at lorem.
                        Curabitur non sollicitudin neque.
                    </div>
                </TECollapse>
            </div> */}
        </>
    );
};

export default Bio;
