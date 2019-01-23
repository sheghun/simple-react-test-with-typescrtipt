import { createStore, compose, applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from "./reducers";


const composers = () => {
    if (process.env.NODE_ENV !== 'production') {
        return compose(
            applyMiddleware(
                thunkMiddleware,
            ),
            composeWithDevTools()
        )
    } else {
        return compose(
            applyMiddleware(
                thunkMiddleware
            )
        )
    }
}

const store = createStore(reducers,composers());

export default store