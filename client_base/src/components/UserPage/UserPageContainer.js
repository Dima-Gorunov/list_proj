import React from 'react';
import {connect} from "react-redux";
import UserPage from "./UserPage";
import {getUser, getUserError} from "../../ReduxToolkit/Selectors/UserSelector";
import {compose} from "redux";
import WithPreloader from "../../Hoс/WithPreloader";
import {setAvatarThunk} from "../../ReduxToolkit/Slice/UserSlice";

const UserPageContainer = (props) => {

    return <UserPage {...props}/>
};
const mapStateToProps = (state) => {
    return {
        User: getUser(state),
        UserError: getUserError(state)
    }
}

export default compose(
    WithPreloader,
    connect(mapStateToProps, {
        setAvatarThunk
    })
)(UserPageContainer);