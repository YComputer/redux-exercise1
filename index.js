var expect = require('expect');
var deepFreeze = require('deep-freeze');
var Redux = require('redux');
var React = require('react');
var ReactDOM = require('react-dom');
const {combineReducers} = Redux;
const {createStore} = Redux;
const {Component} = React;


// 分割reducer
const todo = (state, action) => {
    console.log('todo reducer');
        console.log(state);
    
  switch (action.type) {
    case 'ADD_TODO':
      return { id: action.id, text: action.text, completed: false };
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }
      return Object.assign({}, state, { completed: !state.completed });
    default:
      return state;
  }
}
// writing a todo list reducer
const todos = (state = [], action) => {
    console.log('todos reducer')
        console.log(state);
    
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, todo(undefined, action)];
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action));
    default:
      return state;

  }
}
const visibilityFilter = (state = 'SHOW_ALL', action) => {
        console.log('visibility reducer');
        console.log(state);
        switch (action.type) {
            case 'SET_VISIBILITY_FILTER':
                return action.filter;
            default:
                return state;
        }
}

const todoApp = combineReducers({
    todos,
    visibilityFilter
})
const store = createStore(todoApp);
// compoent 的简便写法，filter和children是props。
const FilterLink = ({filter, children}) => {
    return (
        <a href='#'
           onClick={e => {
               e.preventDefault();
               store.dispatch({
                   type:'SET_VISIBILITY_FILTER',
                   filter
               })
           }}
        >
        {children}
        </a>
    )
}

let nextTodoId = 0;
class TodoApp extends Component{
    render(){
        return (
            <div>
                <input ref={node => {this.input = node}}/>
                <button onClick={()=>{
                    if(this.input.value.trim() === '')
                    return;
                    store.dispatch({
                        type: 'ADD_TODO',
                        text: this.input.value,
                        id: nextTodoId++
                    });
                    this.input.value = '';
                }}>
                    Add Todo
                </button>
                <ul>
                    {this.props.todos.map(todo =>
                        <li key={todo.id}
                            onClick={()=>{
                                store.dispatch({
                                    type: 'TOGGLE_TODO',
                                    id: todo.id
                                })
                            }}
                            style={{textDecoration: todo.completed?'line-through':'none'}}>
                        {todo.text}
                        </li>
                    )}
                </ul>
                <p>
                    Show:
                    {' '}
                    <FilterLink
                        filter='SHOW_ALL'
                    >
                        ALL
                    </FilterLink>
                    {' '}
                    <FilterLink
                        filter='SHOW_ACTIVE'
                    >
                        Active
                    </FilterLink>
                    {' '}
                    <FilterLink
                        filter='SHOW_COMPLETED'
                    >
                        Completed
                    </FilterLink>
                </p>
            </div>
        )
    };
}

const render = () => {
    console.log(store.getState());
    ReactDOM.render(
        <TodoApp todos={store.getState().todos}/>,
        document.getElementById('app')
    );
};

store.subscribe(render);
render();

