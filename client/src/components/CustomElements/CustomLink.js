import React from 'react';
import {Link} from "react-router-dom";

const CustomLink = (props) => {
    return (
        <div>
            <Link to={props.to} type="button"
                  className="border border-white text-white p-1 m-2 text-decoration-none">{props.children}</Link>
        </div>
    );
};

export default CustomLink;