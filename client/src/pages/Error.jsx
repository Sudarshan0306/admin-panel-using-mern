import React from "react";
import { NavLink } from "react-router-dom";

const Error = () => {
    return (
        <>
            <section className="error-page">
                <div className="content">
                    <h2 className="header">404</h2>
                    <h4>Sorry! Page not found</h4>
                    <p className="mt-3 mb-3">
                        Oops! It seems like the page you are trying to access doesn't exist.
                        If you believe there's an issue, feel free to report it, and we'll
                        look into it
                    </p>
                    <div className="btns mb-4">
                        <NavLink to="/"> Return to Home</NavLink>
                        <NavLink to="/contact"> Report Problem </NavLink>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Error;
