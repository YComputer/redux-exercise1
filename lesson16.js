var expect = require('expect');
var deepFreeze = require('deep-freeze');
var Redux = require('redux');
var React = require('react');
var ReactDom = require('react-dom');

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
});

const store = Redux.createStore(todoApp);

let nextTodoId;
class TodoApp extends React.Component{
    render() {
        return(
            <div>
                <button onClick={()=>{
                    store.dispatch({
                        type: 'ADD_TODO',
                        text: 'Test',
                        id: nextTodoId++
                    })
                }}>
                    Add Todo
                </button>
                <ul>
                    {this.props.todos.map(todo => {
                        <li key={todo.id}>
                            {todo.text}
                        </li>
                    })}
                </ul>
            </div>
        )
    }
}

const render = () => {
    ReactDom.render(
        <TodoApp todos={store.getState().todos} />,
        document.getElementById('root')
    )
};

store.subscribe(render);
render();














