import React from 'react';

const AboutPage = (props) => {
    return (
        <div>
            {props.Data && props.Data.map((e, index) => (<div key={`text ${index}`}>
                {e.id} || {e.text}
            </div>))}
        </div>
    );
};

export default AboutPage;