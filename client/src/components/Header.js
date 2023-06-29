import React from "react";

function Header({logoClick}) {

    return(
            <img onClick={logoClick} src="/assets/Logo-final.png" alt="Hi"/>
    )
}

export default Header