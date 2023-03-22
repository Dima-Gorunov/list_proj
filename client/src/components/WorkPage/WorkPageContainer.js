import React, {useEffect} from 'react';
import {connect} from "react-redux";
import WorkPage from "./WorkPage";
import {
    addListThunk,
    changeInput,
    deleteListThunk,
    getDataThunk,
} from "../../ReduxToolkit/Slice/AppSlice";

import {
    getData,
    getFile,
    getFileFormActive, getImage,
    getInput,
    getListError,
    getSuccess
} from "../../ReduxToolkit/Selectors/AppSelector";
import {getUser} from "../../ReduxToolkit/Selectors/UserSelector";
import {Navigate} from "react-router-dom";
import {ACTIVATE_ROUTE, LOGIN_ROUTE} from "../../Utils/const";

const WorkPageContainer = (props) => {
    useEffect(() => {
        props.getDataThunk()
    }, [])
    if (!props.User.IsAuth) {
        return <Navigate to={LOGIN_ROUTE}/>
    }
    if (!props.User.Activated) {
        return <Navigate to={ACTIVATE_ROUTE}/>
    }
    return <WorkPage {...props} />
};

const mapStateToProps = (state) => {
    return {
        Success: getSuccess(state),
        Data: getData(state),
        Input: getInput(state),
        User: getUser(state),
        ListError: getListError(state),
        FileFormActive: getFileFormActive(state),
        File: getFile(state),
        Image: getImage(state)
    }
}

export default connect(mapStateToProps, {
    getDataThunk,
    deleteListThunk,
    changeInput,
    addListThunk,
})(WorkPageContainer);