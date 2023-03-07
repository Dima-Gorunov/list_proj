import {useState} from "react";

const WorkPage = (props) => {

    const [FileFormActive, setFileFormActive] = useState(false)

    const formActive = (e) => {
        e.preventDefault()
        setFileFormActive(!FileFormActive)
    }

    const change = (e) => {
        e.preventDefault()
        console.log(e.currentTarget.value)
        props.changeInput(e.currentTarget.value)
    }

    const addList = async (e) => {
        e.preventDefault()
        await props.addListThunk(props.Input, props.User.id)
    }

    const fileChange = (e) => {
        props.setFile(e.target.files[0])
    }

    const uploadFile = (e) => {
        let formData = new FormData()
        formData.append("file", props.File)
        e.preventDefault()
        props.uploadFileThunk(formData)
    }

    return (
        <div className="p-2">
            {props.ListError && <div>err: {props.ListError}</div>}
            <form className="form-inline">
                <div className="d-flex mb-3">
                    <input className="form-control me-3" value={props.Input} onChange={change} type="text"
                           placeholder="Search" aria-label="текст"/>
                    <button className="border border-white bg-dark text-white p-1 text-decoration-none"
                            onClick={addList} type="submit">Добавить
                    </button>
                </div>
                <button onClick={formActive}>Добавить файл?
                </button>
                {FileFormActive && <div className="form-group col-md-6">
                    <label className="text-white">Select File :</label>
                    <input type="file" multiple={true} className="form-control" name="file" onChange={fileChange}/>
                    <button type="submit" onClick={uploadFile}>добавить</button>
                </div>}
            </form>
            {props.Data ? props.Data.map((e, index) => (
                <div className="d-flex mb-3 justify-content-between" key={`div n${index}`}>
                    <div className="w-100 me-3 border border-top-0 border-start-0 ">
                        {e.text}
                    </div>
                    <button type="button" className="border border-white bg-dark text-white p-1 text-decoration-none"
                            onClick={() => props.deleteListThunk(e.id)}>удалить
                    </button>
                </div>)) : <div>нет данных</div>}
        </div>
    );
};

export default WorkPage;