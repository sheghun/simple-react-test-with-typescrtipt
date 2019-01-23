// * Import the possible actions
import { TEST_ACTION } from './actions';
import { combineReducers } from 'redux'

type state = string
type action = {
    type: string
}

export function testActionReducer(state: state = 'no', action: action) {
    // * Check the action type
    switch (action.type) {
        case TEST_ACTION:
            return state = 'yes'
    
        default:
            return state
    }
}


// * Combine the reducers
const reducers = combineReducers({
    test: testActionReducer
})

export default reducers