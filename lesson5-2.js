// 我要写一个reducer，写一个counter reducer

var expect = require('expect');

const counter = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }

};


expect(counter(0,{type: 'INCREMENT'})).toEqual(1);