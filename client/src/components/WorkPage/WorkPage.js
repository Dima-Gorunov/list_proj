
const WorkPage = (props) => {
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
        debugger
        console.log(e.target.files[0]);
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