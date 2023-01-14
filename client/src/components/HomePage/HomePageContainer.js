import React from 'react';
import HomePage from "./HomePage";
import {connect} from "react-redux";

const HomePageContainer = () => {
    return <HomePage/>
};

export default connect()(HomePageContainer);