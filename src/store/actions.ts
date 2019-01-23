/**
 * * Action file for declaring all the redux actions
 */
import { data } from '../types/data';



// DECLARE ALL ACTION CONSTANTS
export const TEST_ACTION = 'TEST_ACTION'
export const ADD_DATA = 'ADD_DATA'
export const DELETE_DATA = 'DELETE_DATA'



// ACTION INTERFACES 
export interface dataActionInterface {
    type: string,
    data: data,
    index: number

}


// For adding data to the state
export function addData(data: data): dataActionInterface {
    // * return the data type
    return {
        type: ADD_DATA,
        data,
        index: 0
    }
}


// For deleting state in the state
export function deleteData(index: number): dataActionInterface{
    // We are going to be returning an an data coz of typescrpt
    return {
        type: DELETE_DATA,
        data: { name: '', type: '', chartType: '', filterTypes: [], frequency: '', active: false},
        index
    }
}

