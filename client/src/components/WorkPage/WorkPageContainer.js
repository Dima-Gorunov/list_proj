import React, {useEffect} from 'react';
import {connect} from "react-redux";
import WorkPage from "./WorkPage";
import {
    addListThunk,
    changeInput,
    deleteListThunk,
    getDataThunk, setFile,
    uploadFileThunk
} from "../../ReduxToolkit/Slice/AppSlice";
import Loader from "../Loader";
import {
    getData,
    getFile,
    getFileFormActive,
    getInput,
    getListError,
    getSuccess
} from "../../ReduxToolkit/Selectors/AppSelector";
import {getUser} from "../../ReduxToolkit/Selectors/UserSelector";
import {Navigate} from "react-router-dom";

const WorkPageContainer = (props) => {
    useEffect(() => {
        props.User.isAuth && props.getDataThunk(props.User.id)
    }, [props.User.isAuth])
    if (!props.User.isAuth) {
        return <Navigate to="/login"/>
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
        File:getFile(state)
    }
}

export default connect(mapStateToProps, {
    getDataThunk,
    deleteListThunk,
    changeInput,
    setFile,
    addListThunk,
    uploadFileThunk
})(WorkPageContainer);