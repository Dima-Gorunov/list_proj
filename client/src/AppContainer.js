import './App.css';
import {connect} from "react-redux";
import {changeInput} from "./ReduxToolkit/Slice/AppSlice";
import App from "./App";

const AppContainer = (props) => {
    return <App {...props} />
}

const mapStateToProps = (state) => {
    return {
        Input: state.App.Input,
        Data: state.App.Data
    }
}

export default connect(
    mapStateToProps, {
        changeInput
    }
)(AppContainer);
