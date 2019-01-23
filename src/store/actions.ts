/**
 * * Action file for declaring all the redux actions
 */
import { data } from '../types/data';



// DECLARE ALL ACTION CONSTANTS
export const TEST_ACTION = 'TEST_ACTION'
export const ADD_DATA = 'ADD_DATA'



// ACTION INTERFACES 
export interface addDataActionInterface {
    type: string,
    data: data
}


// For adding data to the state
export function addData(data: data): addDataActionInterface {
    // * return the data type
    return {
        type: ADD_DATA,
        data
    }
}


