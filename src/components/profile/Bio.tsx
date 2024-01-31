import React, { useState } from 'react';
import { TECollapse } from 'tw-elements-react';

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

const Bio: React.FC<BioProps> = ({ user }: BioProps) => {
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
            <h4 className="mt-0 mb-2 text-2xl font-medium leading-tight text-primary">
                About {user.firstName}            </h4>
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
