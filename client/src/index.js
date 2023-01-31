import ReactDOM from 'react-dom/client';
import App from './AppContainer';
import {Provider} from "react-redux";
import {store} from "./ReduxToolkit";
import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <div className="App" >
                <App/>
            </div>
        </Provider>
    </BrowserRouter>
);
