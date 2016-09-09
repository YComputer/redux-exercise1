import expect from 'expect';
import {createStore} from 'redux'

const counter = (state = 0, action) => {
    if(action.type === 'INCREMENT'){
        return state +1;
    }else if(action.type === 'DECREMENT'){
        return state -1;
    }else{
        return state;
    }
}

const store = createStore(counter);
const render = ()=>{
    console.log(store.getState());
    document.body.innerText = store.getState();
}
store.subscribe(render);
render();
document.addEventListener('click', ()=>{
    store.dispatch({
        type: 'INCREMENT'
    })
})




// setInterval(()=>{
// store.dispatch({type: 'INCREMENT'})
// },1000);

