import {connect} from "react-redux";
import {getLoad} from "../ReduxToolkit/Selectors/UserSelector";
import Loader from "../components/Loader";

const WithPreloader = (Component) => {
    const ComponentWithPreloader = (props) => {

        if (props.Load) {
            return <Loader/>
        }
        return <Component {...props}/>
    }

    const mapStateToProps = (state) => {
        return {
            Load: getLoad(state)
        }
    }

    return connect(mapStateToProps, {})(ComponentWithPreloader)
}
export default WithPreloader