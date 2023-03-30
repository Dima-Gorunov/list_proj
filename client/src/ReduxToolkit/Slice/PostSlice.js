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
        PostError: "",
    },
    reducers: {
        setPosts(state, {payload}) {
            if (state.Posts !== payload) {
                state.Posts = payload || null
            }
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
            console.log(e.message);
            dispatch(setLoad(false))
        }
    }
}

// Posts on profile page

export const getMyPostsThunk = () => {
    return async (dispatch) => {
        try {
            dispatch(setLoad(true))
            const response = await ListApi.getList()
            dispatch(setMyPosts(response.data))
            dispatch(sortMyPosts())
            dispatch(setLoad(false))
        } catch (e) {
            console.log(e.message);
            dispatch(setMyPosts(null))
            dispatch(setLoad(false))
        }
    }
}

export const deleteMyPostThunk = (id) => {
    return async (dispatch) => {
        try {
            const response = await ListApi.deleteList(id)
            dispatch(deleteMyPost(response.data.id))
        } catch (e) {
            console.log(e.message);
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
            console.log(e.message);
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
    sortMyPosts


} = PostSlice.actions
