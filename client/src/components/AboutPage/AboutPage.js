import React from 'react';

const AboutPage = (props) => {
    return (
        <div>
            {props.Data && props.Data.map(e => (<div>
                {e.Id}||{e.Text}
            </div>))}
            <button onClick={() => props.getDataThunk()}>запросить</button>
        </div>
    );
};

export default AboutPage;