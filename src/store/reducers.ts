// * Import the possible actions
import { addDataActionInterface, ADD_DATA } from './actions';
import { combineReducers } from 'redux'
import { datas } from '../types/data';

const initialState: datas = [  ]

export function addDataReducer(state = initialState, action: addDataActionInterface): datas {
    switch (action.type) {
        case ADD_DATA:
            return [...state, action.data]
            break;
    
        default:
            return state
    }
}




// * Combine the reducers
const reducers = combineReducers({
    data: addDataReducer
})

export default reducers