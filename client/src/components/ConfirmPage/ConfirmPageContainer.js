import React from 'react';
import ConfirmPage from "./ConfirmPage";
import {getUser} from "../../ReduxToolkit/Selectors/UserSelector";
import {connect} from "react-redux";

const ConfirmPageContainer = (props) => {

    return <ConfirmPage {...props} />
};

const mapStateToProps = (state) => {
    return {
        User: getUser(state)
    }
}


export default connect(mapStateToProps, {})(ConfirmPageContainer);