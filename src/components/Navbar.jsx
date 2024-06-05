// import it from a library!

import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar">
            <NavLink to="/" style={{backgroundColor: "blue"}}>
                <img className="navbar-img" src="src/assets/home-icon.png"/>
            </NavLink>
        </nav>

    )
}

export default Navbar;