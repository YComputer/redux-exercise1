var expect = require('expect');
var redux = require('redux');

const counter = (state = 0, action) => {
    switch (action.type){
        case 'INCREMENT':
            return state+1;
        case 'DECRMENT':
            return state-1;
        default:
            return state;
    }
}

// const {createStore} = redux;
const createStore = (reducer) => {
    let state;
    let listeners = [];

    const getState = () => {
        return state;
    };

    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
    };

    const subscribe = (listener) => {
        listeners.push(listener);
            console.log('listeners',listeners.length)
        
        return () => {
            listeners = listeners.filter(l => l !== listener);
            console.log('listeners',listeners.length)
        }
    };

    dispatch({});

    return {getState, dispatch, subscribe};
}



const store = createStore(counter);

const render = () => {
     document.body.innerText = store.getState();
}

store.subscribe(render);

render();

document.addEventListener('click', ()=>{
    store.dispatch({type: 'INCREMENT'})
})
