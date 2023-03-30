import React, {useEffect} from 'react';
import PostPage from "./PostPage";
import {connect, useSelector} from "react-redux";
import {compose} from "redux";
import {setPostsInfoThunk} from "../../ReduxToolkit/Slice/PostSlice";
import {getPosts, getPostsLoad} from "../../ReduxToolkit/Selectors/PostSelector";
import Loader from "../Loader";

const PostPageContainer = (props) => {

    useEffect(() => {
        props.setPostsInfoThunk();
    }, [])
    if (props.Load) {
        return <Loader/>
    }
    return <PostPage {...props} />;
};

const mapStateToProps = (state) => {
    return {
        Posts: getPosts(state),
        Load: getPostsLoad(state)
    }
}
export default compose(
    connect(mapStateToProps, {setPostsInfoThunk})
)(React.memo(PostPageContainer));