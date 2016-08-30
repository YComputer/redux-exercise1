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

const {createStore} = redux;
const store = createStore(counter);

const render = () => {
     document.body.innerText = store.getState();
}

store.subscribe(render);
render();

document.addEventListener('click', ()=>{
    store.dispatch({type: 'INCREMENT'})
})
