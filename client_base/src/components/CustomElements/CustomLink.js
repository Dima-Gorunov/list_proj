import React from 'react';
import {Link} from "react-router-dom";

const CustomLink = (props) => {
    return (
        <Link to={props.to} type="button"
              style={{background: "var(--background-primary-color)", borderRadius: "5px", padding: "4px"}}
              className={`border border-white text-white text-decoration-none ${props.className}`}>{props.children}</Link>
    );
};

export default CustomLink;