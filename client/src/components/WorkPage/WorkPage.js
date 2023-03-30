import React, {useState} from "react";
import FileIcon from "../../Svg/FileIcon";
import CustomButton from "../CustomElements/CustomButton";
import moment from "moment";
import AvatarDefaultImg from "../../Svg/AvatarDefault.jpg";

const WorkPage = (props) => {

    const [File, setFile] = useState(null)
    const [Drag, setDrag] = useState(false)
    const change = (e) => {
        e.preventDefault()
        props.changeInput(e.currentTarget.value)
    }
    const addPost = async (e) => {
        e.preventDefault()
        let formData = new FormData()
        formData.append("text", props.Input)
        if (File) {
            formData.append("file", File)
        }
        props.addMyPostThunk(formData)
        setFile(null)
    }

    const fileChange = (e) => {
        setFile(e.target.files[0])
    }

    const dragStartHandler = (e) => {
        e.preventDefault()
        setDrag(true)
    }
    const dragLeaveHandler = (e) => {
        e.preventDefault()
    }
    const onDropHandler = (e) => {
        e.preventDefault()
        setFile(e.dataTransfer.files[0])
    }

    return (
        <div className="">
            {props.PostError && <div>err: {props.PostError}</div>}
            <div className="p-3 mb-5 dark_container" style={{}}>
                <form className="form-inline">
                    <div className="form-group">
                        <div className="d-flex mb-3">
                            <input className="form-control me-2" value={props.Input} onChange={change} type="text"
                                   placeholder="Search" aria-label="текст"/>
                            <label htmlFor="file">
                                <div style={{width: "35px", cursor: "pointer"}} className="me-2">
                                    <FileIcon/>
                                </div>
                                <input accept=".jpg, .png" type="file" id="file" onChange={fileChange} hidden={true}/>
                            </label>
                            <CustomButton
                                onClick={addPost} type="submit">Опубликовать
                            </CustomButton>
                        </div>
                        <div>
                            <div className="drag-and-drop">
                                <div style={{
                                    display: File ? "none" : "flex",
                                    width: "300px",
                                    height: "150px",
                                    background: "var(--border-color)",
                                    borderRadius: "10px",
                                    border: "2px dashed white",
                                    color: "grey",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    textAlign: "center"
                                }}
                                     onDragStart={(e) => dragStartHandler(e)}
                                     onDragLeave={(e) => dragLeaveHandler(e)}
                                     onDragOver={(e) => dragStartHandler(e)}
                                     onDrop={(e) => onDropHandler(e)}
                                >
                                    Перетащите сюда картинку <br/>
                                    (.jpg .png)
                                </div>
                            </div>
                            {File && <div>
                                <div className="mb-3">
                                    Прикреплённый файл: {File.name}
                                </div>
                                <div>
                                    <div className="me-2 mb-2">
                                        <img src={URL.createObjectURL(File)} style={{height: "100px"}} alt=""/>
                                    </div>
                                    <CustomButton type="button" onClick={() => setFile(null)}
                                                  style={{
                                                      height: "35px",
                                                      background: "var(--background-primary-color)"
                                                  }}
                                                  className="border align-self-end border-white text-white p-1 text-decoration-none"
                                    >удалить
                                    </CustomButton>
                                </div>
                            </div>}
                        </div>
                    </div>
                </form>
            </div>
            <div>
                {props.Posts && props.Posts.map((e, index) => (
                    <div className="mb-3 dark_container" style={{}} key={`div n${index}`}>
                        <div className=" p-3 mb-3" style={{}} key={`d_post${index}`}>
                            <div className="d-flex mb-2">
                                <div className="me-2" style={{width: "44px", height: "44px"}}>
                                    <img style={{width: "100%", height: "100%", borderRadius: "22px"}}
                                         src={props.User.Avatar || AvatarDefaultImg} alt=""/>
                                </div>
                                <div className="d-flex row">
                                    <div className="">
                                        {props.User.Email}
                                    </div>
                                    <div className="opacity-25 flex-up" style={{fontSize: "13px"}}>
                                        {moment(e.createdAt).fromNow()}
                                    </div>
                                </div>
                            </div>
                            <div>
                                {e.text}
                            </div>
                            <div className="d-flex justify-content-between">
                                <div className="">
                                    {e.img &&
                                    <img src={e.img} style={{width: "70%", maxHeight: "250px", objectFit: "cover"}}
                                         alt=""/>}</div>
                                <button type="button" style={{
                                    backgroundColor: "var(--background-primary-color)",
                                    color: "white",
                                    padding: "4px",
                                    borderRadius: "5px",
                                    border: "1px solid white"
                                }}
                                        className="align-self-end"
                                        onClick={() => props.deleteMyPostThunk(e.id)}>удалить
                                </button>
                            </div>
                        </div>
                    </div>))}
            </div>
        </div>
    );
};

export default WorkPage;