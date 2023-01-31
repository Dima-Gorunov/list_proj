import React from 'react';
import {connect} from "react-redux";
import AdminPage from "./AdminPage";

const AdminPageContainer = (props) => {
    return <AdminPage {...props} />
};

const mapStateToProps = (state) => {
    return {}
}

export default connect(mapStateToProps, {})(AdminPageContainer);