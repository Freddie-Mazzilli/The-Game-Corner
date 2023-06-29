import React from "react";

function Search({setSearchText}) {



    return(
        <div className="user-input">
            <label htmlFor="search">Search Games:</label>
            <input
                className="form"
                type="text"
                id="search"
                placeholder="Search Games..."
                onChange={(event) => {
                    setSearchText(event.target.value)
                }}
            />
            <div>
                <select name="Online">
                    <option value="all">All</option>
                    <option value={true}>Online</option>
                    <option value={false}>Offline</option>
                </select>
            </div>
        </div>
    )
}

export default Search