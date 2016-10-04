var expect = require('expect');
var deepFreeze = require('deep-freeze');


const todo = (state, action) => {
    switch (action.type){
        case 'ADD_TODO':
            return {
                id: action.id,
                text: action.text,
                completed: false
            };

        case 'TOGGLE':
            if(state.id === action.id){
                return Object.assign(
                    {},
                    state,
                    {completed: !state.completed}
                );
            }
            return state;
        default:
            return state;
    }
}



const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                todo(undefined, action)
            ];
        case 'TOGGLE':
            return state.map(t => todo(t,action));
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