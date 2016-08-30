var expect = require('expect');
var deepFreeze = require('deep-freeze');

// writing a todo list reducer
const todos = (state=[], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [...state, {id:action.id,text:action.text,completed: false}];
        case 'TOGGLE_TODO':
            return state.map(todo => {
                if(todo.id !== action.id){
                    return todo;
                }
                // return {
                //     ...todo,
                //     completed: !todo.completed
                //     };
                return Object.assign({}, todo, {completed: !todo.completed});
            });
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

const testToggleTodo = () => {
    const stateBefor = [
        {
            id: 0,
            text: 'Learn Redux',
            completed: false
        },
        {
            id:1,
            text: 'Go shopping',
            completed: false
        }
    ];
    const action = {
        type: 'TOGGLE_TODO',
        id: 1
    };
    const stateAfter = [
        {
            id: 0,
            text: 'Learn Redux',
            completed: false
        },
        {
            id:1,
            text: 'Go shopping',
            completed: true
        }
    ];

    deepFreeze(stateBefor);
    deepFreeze(action);

    expect(
        todos(stateBefor, action)
    ).toEqual(stateAfter);
}


testAddTodo();
testToggleTodo()
console.log('All tests passwd.')