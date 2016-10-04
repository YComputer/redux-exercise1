// 我要用React 来实现
import ReactDom from 'react-dom';
import React from 'react';
import { createStore } from 'redux';


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

// const { createStore } = Redux;
// var createStore = Redux.createStore;
// import { createStore } from 'redux';
const store = createStore(counter);

class Counter extends React.Component{
    render() {
        return (
            <div>
                <h1>{this.props.value}</h1>
                <button onClick={this.props.onIncrement}>+</button>
                <button onClick={this.props.onDecrement}>-</button>
            </div>
        )
    }
}

const render = () => {
    ReactDom.render(
        <Counter
            value={store.getState()}
            onIncrement={() => {store.dispatch({type:'INCREMENT'})}}
            onDecrement={() => {store.dispatch({type:'DECREMENT'})}}
        />,
        document.getElementById('root')
    )
}


store.subscribe(render);
render();
