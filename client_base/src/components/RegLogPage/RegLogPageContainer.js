import React from 'react';
import {connect} from "react-redux";
import RegLogPage from "./RegLogPage";
import {getUserError, getUser, getLoad} from "../../ReduxToolkit/Selectors/UserSelector";
import {loginThunk, regThunk, setUserError} from "../../ReduxToolkit/Slice/UserSlice";

import {compose} from "redux";
import WithPreloader from "../../Hoс/WithPreloader";

const RegLogPageContainer = (props) => {
    return <RegLogPage {...props}/>
};
const mapStateToProps = (state) => {
    return {
        User: getUser(state),
        UserError: getUserError(state),
        Load: getLoad(state)
    }
}

export default compose(
    WithPreloader,
    connect(mapStateToProps, {loginThunk, regThunk, setUserError})
)(RegLogPageContainer);