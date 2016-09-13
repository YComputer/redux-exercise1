import expect from 'expect';
import {createStore} from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';

// reducer
const counter = (state = 0, action) => {
    if (action.type === 'INCREMENT') {
        return state + 1;
    } else if (action.type === 'DECREMENT') {
        return state - 1;
    } else {
        return state;
    }
};

const Counter = React.createClass({
    render: function () {
        return (
            <div>
                <h1>{this.props.value}</h1>
                <button onClick={this.props.onIncrement}>+</button>
                <button onClick={this.props.onDecrement}>-</button>
            </div>
        )
    }
});

const store = createStore(counter);

const render = () => {
    ReactDOM.render(
        <Counter 
            value={store.getState()}
            onIncrement={() => {
                store.dispatch({
                    type: 'INCREMENT'
                })
            }}
            onDecrement={() => {
                store.dispatch({
                    type: 'DECREMENT'
                })
            }}
        />,
        document.getElementById('root')
    );
};

store.subscribe(render);

render();

