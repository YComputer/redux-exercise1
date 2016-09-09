import expect from 'expect';
// import {createStore} from 'redux'

const counter = (state = 0, action) => {
    if (action.type === 'INCREMENT') {
        return state + 1;
    } else if (action.type === 'DECREMENT') {
        return state - 1;
    } else {
        return state;
    }
}

const createStore = (reducer) => {
    let state;
    let listeners = [];

    const getState = () => state;

    const dispatch = (action) => {
        state = reducer(state,action);
        listeners.forEach((listener)=>{
            listener()
        })
    };

    const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter((l)=>{
                l !== listener;
            })
        }
    }
    dispatch({})

    return {getState, dispatch, subscribe}
}

const store = createStore(counter);
store.subscribe(() => {
    console.log(store.getState());

})
setInterval(() => {
    store.dispatch({ type: 'INCREMENT' })
}, 1000);



