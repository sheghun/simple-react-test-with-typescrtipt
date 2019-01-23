import React from 'react';
import * as enzyme from 'enzyme'
import ReactDOM from 'react-dom';
import reducers from './store/reducers';
import store from './store/store';
// @ts-ignore
import { Provider } from 'react-redux'

import App from './App';

const addAction = {
    type: 'ADD_DATA',
    data: {
        name: 'Thirty day visitor report',
        type: 'Visitors',
        chartType: 'bar',
        filterTypes: ['Gender', 'Age range'],
        frequency: 'monthly', active: true
    },
    index: 0
}

test('Redux addData Action Works', () => {
    let state;
    state = reducers({ data: [] }, addAction);
    expect(state).toEqual({ data: [addAction.data] });
});


const deleteAction = {
    type: 'DELETE_DATA',
    data: {
        name: 'Thirty day visitor report',
        type: 'Visitors',
        chartType: 'bar',
        filterTypes: ['Gender', 'Age range'],
        frequency: 'monthly',
        active: true
    },
    index: 0
}


test('Redux deleteData Action Works', () => {
    let state;
    state = reducers({ data: [addAction.data] }, deleteAction)
    expect(state).toEqual({ data: [] })
})