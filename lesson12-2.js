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
        case 'TOGGLE':
            return state.map(todo=>{
                if(todo.id === action.id){
                    return Object.assign(
                        {},
                        todo,
                        {completed: !todo.completed}
                    );
                }
                return todo;
            });
        default:
            return state;
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

const testToogleTodo = () => {
    const testState = [
        {
            id:0,
            text: 'learn redux',
            completed: false
        },
        {
            id:1,
            text: 'learn react',
            completed: false
        }
    ];

    const action = {
        type: 'TOGGLE',
        id:0
    };

    const testAfter = [
        {
            id:0,
            text: 'learn redux',
            completed: true
        },
        {
            id:1,
            text: 'learn react',
            completed: false
        }
    ];

    deepFreeze(testState);
    deepFreeze(action);

    expect(todos(testState, action)).toEqual(testAfter);
}

testAddTodo();
testToogleTodo();
console.log('test pass');