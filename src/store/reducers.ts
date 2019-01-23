// * Import the possible actions
import { dataActionInterface, ADD_DATA, DELETE_DATA } from './actions';
import { combineReducers } from 'redux'
import { datas } from '../types/data';

const initialState: datas = [  ]

export function addDataReducer(state = initialState, action: dataActionInterface): datas {
    switch (action.type) {
        case ADD_DATA:
            return [...state, action.data]

        case DELETE_DATA:
            return [...state].filter((data, index) => (index !== action.index))
    
        default:
            return state
    }
}




// * Combine the reducers
const reducers = combineReducers({
    data: addDataReducer
})

export default reducers