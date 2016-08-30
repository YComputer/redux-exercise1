var expect = require('expect');
var deepFreeze = require('deep-freeze');

// writing a todo list reducer
const todos = (state=[], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [...state, {id:action.id,text:action.text,completed: false}];
        default:
            return state;

    }
}

const testAddTodo = () => {
    const stateBefor = [];
    const action = {
        type: 'ADD_TODO',
        id: 0,
        text: 'Learn Redux'
    };
    const stateAfter = [
        {
            id:0,
            text: 'Learn Redux',
            completed: false
        }
    ];

    deepFreeze(stateBefor);
    deepFreeze(action);

    expect(
        todos(stateBefor, action)
    ).toEqual(stateAfter);
};
testAddTodo();
console.log('All tests passwd.')