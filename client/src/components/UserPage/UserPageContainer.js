import React from 'react';
import {connect} from "react-redux";
import UserPage from "./UserPage";
import {getUser} from "../../ReduxToolkit/Selectors/UserSelector";
import {compose} from "redux";
import WithPreloader from "../../Hoс/WithPreloader";
import {setAvatarThunk} from "../../ReduxToolkit/Slice/UserSlice";

const UserPageContainer = (props) => {

    return <UserPage {...props}/>
};
const mapStateToProps = (state) => {
    return {
        User: getUser(state)
    }
}

export default compose(
    WithPreloader,
    connect(mapStateToProps, {
        setAvatarThunk
    })
)(UserPageContainer);