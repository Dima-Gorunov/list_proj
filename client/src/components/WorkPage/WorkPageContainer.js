import React, {useEffect} from 'react';
import {connect} from "react-redux";
import WorkPage from "./WorkPage";
import {Navigate} from "react-router-dom";
import {ACTIVATE_ROUTE, LOGIN_ROUTE} from "../../Utils/const";
import WithPreloader from "../../Hoс/WithPreloader";
import {compose} from "redux";
import {
    addMyPostThunk, changeInput,
    deleteMyPostThunk,
    getMyPostsThunk, loadMoreMyPostsThunk,
} from "../../ReduxToolkit/Slice/PostSlice";
import {
    getInput,
    getMyPosts,
    getPostError,
    getPostInput,
    getPostsLoad
} from "../../ReduxToolkit/Selectors/PostSelector";
import {getUser} from "../../ReduxToolkit/Selectors/UserSelector";
import Loader from "../Loader";


const WorkPageContainer = (props) => {
    useEffect(() => {
        props.getMyPostsThunk()
    }, [])
    if (!props.User.IsAuth) {
        return <Navigate to={LOGIN_ROUTE}/>
    }
    if (!props.User.Activated) {
        return <Navigate to={ACTIVATE_ROUTE}/>
    }
    if (props.Load) {
        return <Loader/>
    }
    return <WorkPage {...props} />
};

const mapStateToProps = (state) => {
    return {
        Posts: getMyPosts(state),
        Input: getPostInput(state),
        PostError: getPostError(state),
        User: getUser(state),
        Load: getPostsLoad(state)
    }
}

export default compose(
    connect(mapStateToProps, {
        getMyPostsThunk, deleteMyPostThunk,
        changeInput, addMyPostThunk,
        loadMoreMyPostsThunk
    }))(WorkPageContainer);