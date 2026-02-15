import {ListApi} from "../../Api/ListApi";
import {createSlice} from "@reduxjs/toolkit";

const PostSlice = createSlice({
    name: 'PostSlice',
    initialState: {
        Posts: null,  // {list:{id, text, img, createdAt, updateAt, userId}, user:{id, email, activated, avatar, role, username, first_name, last_name, gender}}
        Load: false,
        MyProfile: {
            Posts: null
        },
        Input: "",
        PostError: ""
    },
    reducers: {
        setPosts(state, {payload}) {
            state.Posts = payload || null
        },
        loadMorePosts(state, {payload}) {
            state.Posts = state.Posts.concat(payload)
        },
        loadMoreMyPosts(state, {payload}) {
            state.MyProfile.Posts = state.MyProfile.Posts.concat(payload)
        },
        setMyPosts(state, {payload}) {
            state.MyProfile.Posts = payload || null
        },
        sortMyPosts(state, {payload}) {
            state.MyProfile.Posts = state.MyProfile.Posts ? state.MyProfile.Posts.sort((a, b) => b.id - a.id) : null
        },
        setLoad(state, {payload}) {
            state.Load = payload
        },
        changeInput(state, {payload}) {
            state.Input = payload
        },
        setPage(state, {payload}) {
            state.Page = payload
        },
        addMyPost(state, {payload}) {
            if (!state.MyProfile.Posts) {
                state.MyProfile.Posts = [{
                    id: payload.id,
                    text: payload.text,
                    img: payload.img,
                    createdAt: payload.createdAt
                }]
            } else {
                state.MyProfile.Posts.push({
                    id: payload.id,
                    text: payload.text,
                    img: payload.img,
                    createdAt: payload.createdAt
                })
            }
        },
        deleteMyPost(state, {payload}) {
            state.MyProfile.Posts = state.MyProfile.Posts.filter(e => e.id !== payload)
        },
        setPostError(state, {payload}) {
            state.PostError = payload
        }
    }
})

// All Posts

export const setPostsInfoThunk = (page, perPage) => {
    return async (dispatch) => {
        try {
            dispatch(setLoad(true))
            const lists = await ListApi.getAllList(page, perPage)
            dispatch(setPosts(lists.data))
            dispatch(setLoad(false))
        } catch (e) {
            console.log(e.response?.data?.message || e.message);
            dispatch(setLoad(false))
        }
    }
}

export const loadMorePostsThunk = (page) => {
    return async (dispatch) => {
        try {
            const loadPost = await ListApi.getAllList(page)
            dispatch(loadMorePosts(loadPost.data))
        } catch (e) {
            console.log(e.response?.data?.message || e.message);
        }
    }
}

// Posts on profile page

export const getMyPostsThunk = (page, perPage) => {
    return async (dispatch) => {
        try {
            dispatch(setLoad(true))
            const response = await ListApi.getMyList(page, perPage)
            dispatch(setMyPosts(response.data))
            dispatch(sortMyPosts())
            dispatch(setLoad(false))
        } catch (e) {
            console.log(e.response?.data?.message || e.message);
            dispatch(setMyPosts(null))
            dispatch(setLoad(false))
        }
    }
}
export const loadMoreMyPostsThunk = (page, perPage) => {
    return async (dispatch) => {
        try {
            const loadPost = await ListApi.getMyList(page)
            dispatch(loadMoreMyPosts(loadPost.data))
        } catch (e) {
            console.log(e.response?.data?.message || e.message);
        }
    }
}


export const deleteMyPostThunk = (id) => {
    return async (dispatch) => {
        try {
            const response = await ListApi.deleteList(id)
            dispatch(deleteMyPost(response.data.id))
        } catch (e) {
            console.log(e.response?.data?.message || e.message);
        }
    }
}

export const addMyPostThunk = (formData) => {
    return async (dispatch) => {
        try {
            const response = await ListApi.addMyPost(formData)
            dispatch(addMyPost(response.data))
            dispatch(sortMyPosts())
            dispatch(changeInput(""))
        } catch (e) {
            console.log(e.response?.data?.message || e.message);
        }
    }
}

export default PostSlice.reducer
export const {
    setPosts,
    setLoad,
    setMyPosts,
    addMyPost,
    deleteMyPost,
    changeInput,
    sortMyPosts,
    loadMorePosts,
    loadMoreMyPosts,
    setPage

} = PostSlice.actions
