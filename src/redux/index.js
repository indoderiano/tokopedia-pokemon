import {createStore} from 'redux'

const initialState = {
    list: []
}

function reducer (state=initialState, action) {
    switch(action.type){
        case 'POKE/ADD':
            return {...state, list: [...state.list, action.payload]}
        case 'POKE/UPDATE':
            return {...state, list: action.payload}
        default:
            return state
    }
}

const store = createStore(reducer)

export default store