import React from "react";
import { NavLink } from "react-router-dom";

function Nav() {

    return(
        <div className="nav-bar">
            <NavLink to='/home'>Home</NavLink>
            <NavLink to='/games'>Games</NavLink>
            <NavLink to='/games/new_game'>Add New Game</NavLink>
            <NavLink to='/devices'>Devices</NavLink>
            <NavLink to='/developers'>Developers</NavLink>
            <NavLink to='/'>Logout</NavLink>
        </div>
    )
}

export default Nav