import React, { useEffect, useState, ChangeEvent } from "react";
import { Link, useFetcher, useParams } from "react-router-dom";
// import config from "../config";
import "./style.css"
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
    //   const apiUrl =
    //     process.env.NODE_ENV === "development"
    //       ? config.development.apiUrl
    //       : config.production.apiUrl;

    // useEffect(() => {
    //     handleSearch();
    // }, [searchName]);

    // useEffect(() => {
    //     setResults([]);
    // }, [id]);

    // const handleSearch = async () => {
    //     fetch(`http://localhost:4000/search?name=${searchName}`, {
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //     })
    //         .then((response) => response.json())
    //         .then((response) => setResults(response));
    // };

    useEffect(() => {
        const searchResultsDiv = document.querySelector(".search-results") as HTMLElement | null;
        if (searchResultsDiv) {
            searchResultsDiv.style.display = searchName === "" ? "none" : "";
        }
    }, [searchName]);


    return (
        <div id="search-container">
            <input
                id="name-search"
                type="text"
                value={searchName}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setSearchName(e.target.value)
                }
                placeholder="Search for a user or group"
            />
            {/* <button onClick={handleSearch}>Search</button> */}
            <div className="search-results">
                {results.map((result, index) => (
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
