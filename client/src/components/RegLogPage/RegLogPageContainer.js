import React, {useEffect} from 'react';
import {connect} from "react-redux";
import RegLogPage from "./RegLogPage";
import {getUserError, getUser} from "../../ReduxToolkit/Selectors/UserSelector";
import {loginThunk, regThunk, setUserError} from "../../ReduxToolkit/Slice/UserSlice";

const RegLogPageContainer = (props) => {
    return <RegLogPage {...props}/>
};
const mapStateToProps = (state) => {
    return {
        User: getUser(state),
        UserError: getUserError(state)
    }
}

export default connect(mapStateToProps, {
    loginThunk, regThunk, setUserError
})(RegLogPageContainer);