import expect from 'expect';
import deepFreeze from 'deep-freeze';
import {createStore, combineReducers} from 'redux';

const visibilityFilter = (state = 'SHOW_ALL', action) => {
    console.log('----filter----------------');
    switch (action.type){
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    }
}

const todo = (state, action) => {
    console.log('----todo------');
    switch (action.type){
      case 'ADD_TODO':
          return {
              id: action.id,
              text: action.text,
              completed: false
          };
      case 'TOGGLE_TODO':
          if(state.id === action.id){
              return Object.assign(
                  {},
                  state,
                  {
                      completed: !state.completed
                  }
              )
          }
          return state;
      default:
          return state;
  }
};

const todos = (state = [], action) => {
    console.log('----todos------');
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                todo(undefined,action)
            ];
        case 'TOGGLE_TODO':
            return state.map(t => todo(t,action));
        default:
            return state;
    }
};

const todoApp = combineReducers({
    todos,
    visibilityFilter
})

// const todoApp = (state={},action) => {
//     return {
//         todos: todos(
//             state.todos,
//             action
//         ),
//         visibilityFilter: visibilityFilter(
//             state.visibilityFilter,
//             action
//         )
//     }
// };

const store = createStore(todoApp);
console.log('Dispatching SET_VISIBILITY_FILTER');
store.dispatch({
    type: 'SET_VISIBILITY_FILTER',
    filter: 'SHOW_ALL'
});
console.log('Current state:');
console.log(store.getState());

// const testAddTodo = () => {
//     const stateBefore = [];
//     const action = {
//         type: 'ADD_TODO',
//         id: 0,
//         text: 'learn redux'
//
//     };
//     const stateAfter = [
//         {
//             id: 0,
//             text: 'learn redux',
//             completed: false
//         }
//     ];
//
//     deepFreeze(stateBefore);
//     deepFreeze(action);
//
//     expect(
//         todos(stateBefore, action)
//     ).toEqual(stateAfter);
// };
//
// const testToggleTodo = () => {
//     const stateBefore = [
//         {
//             id: 0,
//             text: 'learn redux',
//             completed: false
//         },
//         {
//             id: 1,
//             text: 'Go shopping',
//             completed: false
//         }
//     ];
//     const action = {
//         type: 'TOGGLE_TODO',
//         id: 1
//     };
//
//     const stateAfter = [
//         {
//             id: 0,
//             text: 'learn redux',
//             completed: false
//         },
//         {
//             id: 1,
//             text: 'Go shopping',
//             completed: true
//         }
//     ];
//
//     deepFreeze(stateBefore);
//     deepFreeze(action);
//
//     expect(
//         todos(stateBefore,action)
//     ).toEqual(stateAfter);
// };
//
// testAddTodo();
// testToggleTodo();
// console.log('test passed.');










