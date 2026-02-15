import React from 'react';
import HomePage from "./HomePage";
import {connect} from "react-redux";
import {getSuccess} from "../../ReduxToolkit/Selectors/AppSelector";
import {getUser} from "../../ReduxToolkit/Selectors/UserSelector";
import {logOutThunk} from "../../ReduxToolkit/Slice/UserSlice";

const HomePageContainer = (props) => {
    return <HomePage {...props} />
};

const mapStateToProps = (state) => {
    return {
        Success: getSuccess(state),
        User: getUser(state)
    }
}

export default connect(mapStateToProps, {
    logOutThunk
})(HomePageContainer);