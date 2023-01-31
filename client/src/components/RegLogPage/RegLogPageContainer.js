import React, {useEffect} from 'react';
import {connect} from "react-redux";
import RegLogPage from "./RegLogPage";
import {getUserError, getUser} from "../../ReduxToolkit/Selectors/UserSelector";
import {regThunk, setAuthThunk, setUserError} from "../../ReduxToolkit/Slice/UserSlice";
import {useNavigate} from "react-router";

const RegLogPageContainer = (props) => {

    return <RegLogPage {...props}/>
};
const mapStateToProps = (state) => {
    return {
        User: getUser(state),
        UserError: getUserError(state)
    }
}

export default connect(mapStateToProps, {setAuthThunk, regThunk, setUserError})(RegLogPageContainer);