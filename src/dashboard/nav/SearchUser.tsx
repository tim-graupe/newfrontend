import React, { useEffect, useState, ChangeEvent } from "react";
import { Link, useFetcher, useParams } from "react-router-dom";
import config from "../../config";
import "./style.css"
import { TERipple } from 'tw-elements-react';
interface User {
    _id: string;
    profile_pic: string;
    firstName: string;
    lastName: string;
}

interface Group {
    _id: string;
    name: string;
}

interface SearchResult {
    user?: User;
    group?: Group;
}

export const SearchUser: React.FC = () => {
    const [searchName, setSearchName] = useState<string>("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const id = useParams().id;
    const apiUrl =
        process.env.NODE_ENV === "development"
            ? config.development.apiUrl
            : config.production.apiUrl;

    useEffect(() => {
        handleSearch();
    }, [searchName]);

    useEffect(() => {
        setResults([]);
    }, [id]);

    const handleSearch = async () => {
        fetch(`http://localhost:4000/search?name=${searchName}`, {
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((response) => setResults(response));
    };

    useEffect(() => {
        const searchResultsDiv = document.querySelector(".search-results") as HTMLElement | null;
        if (searchResultsDiv) {
            searchResultsDiv.style.display = searchName === "" ? "none" : "";
        }
    }, [searchName]);


    return (
        <div id="search-container">
            <div className="mb-3 md:w-96">
                <div className="relative flex flex-wrap items-stretch w-full mb-4">
                    <input
                        type="search"
                        className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                        placeholder="Search"
                        aria-label="Search"
                        aria-describedby="button-addon1" />

                    {/* <!--Search button--> */}
                    <TERipple color='light'>
                        <button
                            className="relative z-[2] flex items-center rounded-r bg-primary px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
                            type="button"
                            id="button-addon1">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="w-5 h-5">
                                <path
                                    fillRule="evenodd"
                                    d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                    clipRule="evenodd" />
                            </svg>
                        </button>
                    </TERipple>
                </div>
            </div>
            <div className="search-results">
                {Array.isArray(results) && results.map((result, index) => (
                    <div key={index} className="search-result-user-card">
                        {result.user && (
                            <Link to={`/user/${result.user._id}`} className="user-card">
                                <img src={result.user.profile_pic} alt="profile pic" />
                                <p>
                                    {result.user.firstName} {result.user.lastName}
                                </p>
                            </Link>
                        )}
                        {result.group && (
                            <Link to={`/group/${result.group._id}`} className="user-card">
                                <p>{result.group.name}</p>
                            </Link>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
