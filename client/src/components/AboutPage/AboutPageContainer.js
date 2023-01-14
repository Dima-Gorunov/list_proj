import React from 'react';
import AboutPage from "./AboutPage";
import {connect} from "react-redux";
import {getDataThunk} from "../../ReduxToolkit/Slice/AppSlice";

const AboutPageContainer = (props) => {
    return <AboutPage {...props}/>
};

const mapStateToProps = (state) => {
    return {
        Data: state.App.Data
    }
}

export default connect(mapStateToProps,{
    getDataThunk
})(AboutPageContainer);