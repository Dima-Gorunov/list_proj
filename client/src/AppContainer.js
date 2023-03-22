import './App.css';
import {connect} from "react-redux";
import {changeInput} from "./ReduxToolkit/Slice/AppSlice";
import App from "./App";
import {getData, getInput} from "./ReduxToolkit/Selectors/AppSelector";
import {getUser} from "./ReduxToolkit/Selectors/UserSelector";
import {useEffect, useState} from "react";

import {checkAuthThunk, setAuth} from "./ReduxToolkit/Slice/UserSlice";
import {useNavigate} from "react-router";
import Loader from "./components/Loader";

const AppContainer = (props) => {
    const [Load, setLoad] = useState(true);
    const navigate = useNavigate()
    useEffect(() => {
        props.checkAuthThunk().finally(() => {
            setLoad(false)
        })
    }, [])
    if (Load) return <Loader/>
    return (<App {...props} />)
}

const mapStateToProps = (state) => {
    return {
        Input: getInput(state),
        Data: getData(state),
        User: getUser(state)
    }
}

export default connect(mapStateToProps, {
        changeInput, setAuth, checkAuthThunk
    }
)(AppContainer);
