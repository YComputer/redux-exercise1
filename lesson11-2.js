var expect = require('expect');
var deepFreeze = require('deep-freeze');


const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                {
                    id: action.id,
                    text: action.text,
                    completed: false

                }
            ];
    }
};
const testAddTodo = () => {
    const testBefore = [];
    const action = {
        type: 'ADD_TODO',
        id: 0,
        text: 'learn redux'
    };
    const testAfter = [{
        id: 0,
        text: 'learn redux',
        completed: false
    }];

    deepFreeze(testBefore);
    deepFreeze(action);

    expect(todos(testBefore, action)).toEqual(testAfter);
};

testAddTodo();
console.log('test pass');