//
var redux = require('redux');
var createStore = redux.createStore;

// reducer

const counter = (state=0,action) => {
    switch (action.type){
        case 'INCREMENT':
            return state+1;
        case 'DECREMENT':
            return state-1;
        default:
            return state;
    }
};

const store = createStore(counter);

console.log(store.getState());

// store.dispatch({type:'INCREMENT'});
const dispatch = store.dispatch;
dispatch({type:'INCREMENT'});


console.log(store.getState());
