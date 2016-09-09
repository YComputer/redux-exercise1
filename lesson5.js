
// 我们准备写一个reducer。这时候心里要先回顾一下reducer的概念
import expect from 'expect';

const counter = (state = 0, action) => {
    if(action.type === 'INCREMENT'){
        return state +1;
    }else if(action.type === 'DECREMENT'){
        return state -1;
    }else{
        return state;
    }
}

expect(
    counter(0, {type: 'INCREMENT'})
).toEqual(1);

expect(
    counter(1, {type: 'INCREMENT'})
).toEqual(2);

expect(
    counter(2, {type: 'DECREMENT'})
).toEqual(1);

expect(
    counter(1, {type: 'DECREMENT'})
).toEqual(0);

expect(
    counter(1, {type: 'SOMETHING'})
).toEqual(1);

expect(
    counter(undefined, {type: 'SOMETHING'})
).toEqual(0);

console.log('Tests passed!')