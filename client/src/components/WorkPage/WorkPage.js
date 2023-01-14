import React from 'react';

const WorkPage = (props) => {

    const change = (e) => {
        e.preventDefault()
        console.log(e.currentTarget.value)
        props.changeInput(e.currentTarget.value)
    }

    const addList = () => {
        props.addListThunk(props.Input)
    }
    return (
        <div>
            <div>
                <input type="text" value={props.Input} onChange={change}/>
            </div>
            <div>
                <button onClick={addList}>добавить</button>
            </div>
            {props.Data.map((e, index) => (<div key={`div n${index}`}>
                {e.text}
                <button onClick={() => props.deleteListThunk(e.id)}>удалить</button>
            </div>))}
        </div>
    );
};

export default WorkPage;