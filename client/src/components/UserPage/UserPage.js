import React from 'react';
import {useParams} from "react-router";

const UserPage = (props) => {
    const {id} = useParams();
    const {email, username, role} = props.User
    return (
        <div>
            <div>
                email: {email}
            </div>
            <div>
                username: {username || "noname"}
            </div>
            <div>
                role: {role}
            </div>
        </div>
    );
};

export default UserPage;