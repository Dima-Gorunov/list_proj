import {useState} from "react";
import FileIcon from "../../Svg/FileIcon";
import CustomButton from "../CustomElements/CustomButton";

const WorkPage = (props) => {

    const [File, setFile] = useState(null)
    const [Drag, setDrag] = useState(false)
    const change = (e) => {
        e.preventDefault()
        console.log(e.currentTarget.value)
        props.changeInput(e.currentTarget.value)
    }

    const addList = async (e) => {
        e.preventDefault()
        let formData = new FormData()
        formData.append("text", props.Input)
        if (File) {
            formData.append("file", File)
        }
        await props.addListThunk(formData)
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
            {props.ListError && <div>err: {props.ListError}</div>}
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
                                onClick={addList} type="submit">Опубликовать
                            </CustomButton>
                        </div>
                        <div>
                            {<div style={{
                                display: File ? "none" : "flex",
                                width: "300px",
                                height: "150px",
                                background: "var(--border-color)",
                                borderRadius: "10px",
                                border: "2px dashed white",
                                color: "grey",
                                alignItems: "center",
                                justifyContent: "center",
                                textAlign:"center"
                            }}
                                  onDragStart={(e) => dragStartHandler(e)}
                                  onDragLeave={(e) => dragLeaveHandler(e)}
                                  onDragOver={(e) => dragStartHandler(e)}
                                  onDrop={(e) => onDropHandler(e)}
                            >
                                Перетащите сюда картинку <br/>
                                       (.jpg .png)
                            </div>}
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
                {props.Data ? props.Data.map((e, index) => (
                    <div className="p-3 mb-5 dark_container" style={{}} key={`div n${index}`}>
                        <div className="w-100 mb-3 ">
                            {e.text}
                        </div>
                        <div className="d-flex justify-content-between">
                            <div className="">
                                {e.img && <img src={e.img} style={{width: "70%",  maxHeight: "250px", objectFit:"cover"}} alt=""/>}</div>
                            <button type="button" style={{
                                backgroundColor: "var(--background-primary-color)",
                                color: "white",
                                padding: "4px",
                                borderRadius: "5px",
                                border: "1px solid white"
                            }}
                                    className="align-self-end"
                                    onClick={() => props.deleteListThunk(e.id)}>удалить
                            </button>
                        </div>
                    </div>)) : <div>нет данных</div>}
            </div>
        </div>
    );
};

export default WorkPage;