import React from 'react';
import {connect} from "react-redux";
import UserPage from "./UserPage";
import {getUser} from "../../ReduxToolkit/Selectors/UserSelector";

const UserPageContainer = (props) => {
    return <UserPage {...props}/>
};
const mapStateToProps = (state) => {
    return {
        User: getUser(state)
    }
}

export default connect(mapStateToProps, {})(UserPageContainer);