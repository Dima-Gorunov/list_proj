import {connect} from "react-redux";

import Loader from "../components/Loader";
import {getPostsLoad} from "../ReduxToolkit/Selectors/PostSelector";

const WithPostPreloader = (Component) => {
    const ComponentWithPostPreloader = (props) => {

        if (props.Load) {
            return <Loader/>
        }
        return <Component {...props}/>
    }

    const mapStateToProps = (state) => {
        return {
            Load: getPostsLoad(state)
        }
    }

    return connect(mapStateToProps, {})(ComponentWithPostPreloader)
}
export default WithPostPreloader