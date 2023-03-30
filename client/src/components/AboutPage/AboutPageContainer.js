import React from 'react';
import AboutPage from "./AboutPage";
import {connect} from "react-redux";

const AboutPageContainer = (props) => {
    return <AboutPage {...props}/>
};

const mapStateToProps = (state) => {
    return {
        Data: state.App.Data
    }
}

export default connect(mapStateToProps,{

})(AboutPageContainer);