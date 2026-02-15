import React, {useEffect, useState} from 'react';
import moment from "moment";
import AvatarDefaultImg from "../../Svg/AvatarDefault.jpg";
import CustomButton from "../CustomElements/CustomButton";

const PostPage = (props) => {
    const [Page, setPage] = useState(1)
    const loadMore = () => {
        props.loadMorePostsThunk(Page + 1)
        setPage(Page + 1)
    }
    return (
        <div className="post">
            {props.Posts && props.Posts.map((e, index) => (
                <div className="dark_container p-3 mb-3" style={{}} key={`d_post${index}`}>
                    <div className="d-flex mb-2">
                        <div className="me-2" style={{width: "44px", height: "44px"}}>
                            <img style={{width: "100%", height: "100%", borderRadius: "22px"}}
                                 src={e.user.avatar || AvatarDefaultImg} alt=""/>
                        </div>
                        <div className="d-flex row">
                            <div className="">
                                {e.user.email}
                            </div>
                            <div className="opacity-25 flex-up" style={{fontSize: "13px"}}>
                                {moment(e.list.createdAt).fromNow()}
                            </div>
                        </div>
                    </div>
                    <div className="mb-2">
                        {e.list.text}
                    </div>
                    <div className="">
                        {e.list.img &&
                        <img src={e.list.img} style={{width: "70%", maxHeight: "250px", objectFit: "cover"}}
                             alt=""/>}
                    </div>
                </div>
            ))}
            <div className="text-center mb-3">
                <CustomButton onClick={loadMore}>загрузить ещё</CustomButton>
            </div>
        </div>
    );
};

export default PostPage;