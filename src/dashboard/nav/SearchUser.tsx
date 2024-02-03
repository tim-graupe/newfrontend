import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import config from "../../config";


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

// ... (previous imports and components)

export const SearchUser: React.FC = () => {
    const [searchName, setSearchName] = useState<string>("");
    const [results, setResults] = useState<SearchResult>({});
    const { id } = useParams<{ id?: string }>();
    const apiUrl =
        process.env.NODE_ENV === "development"
            ? config.development.apiUrl
            : config.production.apiUrl;

    useEffect(() => {
        handleSearch();
    }, [searchName]);

    useEffect(() => {
        setResults({});
    }, [id]);

    const handleSearch = async () => {
        try {
            const response = await fetch(`${apiUrl}/search?name=${searchName}`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const responseData = await response.json();
            setResults(responseData);
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };

    const clearResults = () => {
        setResults({});
    };

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
                style={{ color: "black" }}
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                placeholder="Search for a user or group"
            />
            {/* <button onClick={handleSearch}>Search</button> */}
            <div className="search-results">
                {results.user && (
                    <div className="user-card">
                        <Link
                            to={`/user/${results.user._id}`}
                            className="search-result-user-card"
                            key={results.user._id}
                            onClick={clearResults}
                        >

                            <img src={results.user.profile_pic} alt="profile pic" />
                            <p>
                                {results.user.firstName} {results.user.lastName}
                            </p>
                        </Link>
                    </div>

                )}
                {/* {results.group && (
                    <Link
                        to={`/group/${results.group._id}`}
                        className="search-result-user-card"
                        key={results.group._id}
                        onClick={clearResults}
                    >
                        <div className="user-card">
                            <p>{results.group.name}</p>
                        </div>
                    </Link>
                )} */}
            </div>
        </div>
    );
};

