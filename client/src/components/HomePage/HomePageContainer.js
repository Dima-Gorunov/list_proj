import React, {useEffect} from 'react';
import HomePage from "./HomePage";
import {connect} from "react-redux";
import {getDataThunk} from "../../ReduxToolkit/Slice/AppSlice";
import {getSuccess} from "../../ReduxToolkit/Selectors/AppSelector";
import {getUser} from "../../ReduxToolkit/Selectors/UserSelector";
import {logOutThunk, setAuth} from "../../ReduxToolkit/Slice/UserSlice";
import {useNavigate} from "react-router";

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
    getDataThunk,
    setAuth,
    logOutThunk
})(HomePageContainer);