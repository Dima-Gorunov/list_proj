import React, {useEffect} from 'react';
import {connect} from "react-redux";
import WorkPage from "./WorkPage";
import {addListThunk, changeInput, deleteListThunk, getDataThunk} from "../../ReduxToolkit/Slice/AppSlice";

const WorkPageContainer = (props) => {
    useEffect(() => {
        props.getDataThunk()
    })
    if (!props.Success) {
        return <div>loading...</div>
    }
    return <WorkPage {...props} />
};

const mapStateToProps = (state) => {
    return {
        Success: state.App.Success,
        Data: state.App.Data,
        Input:state.App.Input
    }
}

export default connect(mapStateToProps, {
    getDataThunk,
    deleteListThunk,
    changeInput,
    addListThunk
})(WorkPageContainer);