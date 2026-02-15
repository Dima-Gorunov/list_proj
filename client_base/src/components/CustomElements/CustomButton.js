import React from 'react';

const CustomButton = (props) => {
    return (
        <button
            style={{
                backgroundColor: "var(--background-primary-color)",
                color: "white",
                padding: "4px",
                borderRadius: "5px",
                border: "1px solid white",
                width:"auto"
            }} {...props} >
            {props.children}
        </button>
    );
};

export default CustomButton;