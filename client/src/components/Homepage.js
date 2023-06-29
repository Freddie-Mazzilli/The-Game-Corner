import React from "react";

function Homepage({manufacturerFocusSelector}) {

    return(
        <div className="home-content">
            <div className="home1">
                <img onClick={manufacturerFocusSelector} src="/assets/nintendo-logo.png" alt="Nintendo"/>
            </div>
            <div className="home1">
                <img onClick={manufacturerFocusSelector} src="/assets/sony-logo.png" alt="Sony"/>
                <img onClick={manufacturerFocusSelector} src="/assets/microsoft-logo.png" alt="Microsoft"/>
            </div>
        </div>
    )
}

export default Homepage