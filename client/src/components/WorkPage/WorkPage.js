import {useNavigate} from "react-router";

const WorkPage = (props) => {
    const navigate = useNavigate()
    const change = (e) => {
        e.preventDefault()
        console.log(e.currentTarget.value)
        props.changeInput(e.currentTarget.value)
    }

    const addList = async (e) => {
        e.preventDefault()
        try {
            await props.addListThunk(props.Input, props.User.id)
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <div>
            {props.ListError && <div>err: {props.ListError}</div>}
            <form className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" value={props.Input} onChange={change} type="text"
                       placeholder="Search" aria-label="текст"/>
                <button className="btn btn-outline-success my-2 my-sm-0" onClick={addList} type="submit">Добавить
                </button>
            </form>
            {props.Data ? props.Data.map((e, index) => (<div key={`div n${index}`}>
                {e.text}
                <button type="button" className="btn btn-outline-danger"
                        onClick={() => props.deleteListThunk(e.id)}>удалить
                </button>
            </div>)) : <div>нет данных</div>}
        </div>
    );
};

export default WorkPage;