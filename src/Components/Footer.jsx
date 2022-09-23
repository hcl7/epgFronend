import React from "react";

const footer = () => {
    const currentYear = (new Date().getFullYear());

    return(
        <div className="container text-center" style={{padding: 20}}>
            <hr />
            &copy; {currentYear} Copyright: @Elvin Mucaj
        </div>
    );
}

export default footer;