var expect = require('expect');
var deepFreeze = require('deep-freeze');
var Redux = require('redux');

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
    console.log('here is in todos');
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

const visibilityFilter = (state='SHOW_ALL', action) => {
    switch (action.type){
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    }
};

const todoApp = Redux.combineReducers({
    todos,
    visibilityFilter
})

// const todoApp = (state = {}, action) => {
//   return {
//       todos: todos(
//           state.todos,
//           action
//       ),
//       visibilityFilter: visibilityFilter(
//           state.visibilityFilter,
//           action
//       )
//   };
// };

const store = Redux.createStore(todoApp);

// console.log('Initial state:');
// console.log(store.getState());
// console.log('----------------');
//
//
// console.log('Dispatching ADD_TODO');
// store.dispatch({
//     type: 'ADD_TODO',
//     id:0,
//     text: 'Learn Redux'
// });
// console.log('Current state');
// console.log(store.getState());
// console.log('----------------');
//
//
// console.log('Dispatching ADD_TODO');
// store.dispatch({
//     type: 'ADD_TODO',
//     id:1,
//     text: 'Go shopping'
// });
// console.log('Current state');
// console.log(store.getState());
// console.log('----------------');
//
//
// console.log('Dispatching TOGGLE');
// store.dispatch({
//     type: 'TOGGLE',
//     id: 0
// });
// console.log('Current state');
// console.log(store.getState());
// console.log('----------------');


// console.log('Dispatching SET_VISIBILITY_FILTER');
// store.dispatch({
//     type: 'SET_VISIBILITY_FILTER',
//     filter: 'SHOW_COMPLETED'
// })
// console.log(store.getState());



















