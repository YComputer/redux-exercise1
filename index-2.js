import React from 'react';
import ReactDom from 'react-dom';
import {createStore, combineReducers} from 'redux';

// todos reducer
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
        case 'TOGGLE_TODO':
            return state.map((todo) => {
                if (todo.id === action.id) {
                    console.log(todo.id);
                    return Object.assign({}, todo, {completed: !todo.completed})
                }
                return todo;
            });
        // case 'ALL':
        //     return state;
        // case 'ACTIVE':
        //     return state.filter((todo) => !todo.completed);
        default:
            return state;
    }
};

const visibilityFilter = (state = 'SHOW_ALL', action) => {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    }
};

const todoApp = combineReducers({
    todos,
    visibilityFilter
});

const getVisibleTodos = (todos, filter) => {
    switch (filter){
        case 'SHOW_ALL':
            return todos;
        case 'COMPLETED':
            return todos.filter(t => t.completed);
        case 'ACTIVE':
            return todos.filter(t=> !t.completed)
    }
}

const store = createStore(todoApp);
let todoIndex = 0;
class TodoApp extends React.Component {
    render() {
        const {todos, visibilityFilter} = this.props;
        const visibleTodos = getVisibleTodos(todos, visibilityFilter);
        return (
            <div>
                <input ref={(node) => {
                    this._input = node
                }}/>
                <button onClick={()=> {
                    if (this._input.value === '') return;
                    store.dispatch({
                        type: 'ADD_TODO',
                        id: todoIndex++,
                        text: this._input.value
                    })
                    this._input.value = '';
                }}>Add Todo
                </button>
                <ul>
                    {visibleTodos.map((todo) =>(
                            <li onClick={() =>
                                store.dispatch({
                                    type: 'TOGGLE_TODO',
                                    id: todo.id
                                })}
                                style={{textDecoration: todo.completed ? 'line-through' : 'none'}}
                                key={todo.id}>
                                {todo.text}
                            </li>
                        )
                    )}
                </ul>
                <p>
                    SHOW:&nbsp;&nbsp;
                    {'SHOW_ALL' === visibilityFilter ? <span>All</span> : <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            store.dispatch({
                                type: 'SET_VISIBILITY_FILTER',
                                filter: 'SHOW_ALL'
                            })
                        }}
                    >All</a>}
                    &nbsp;&nbsp;
                    {'ACTIVE' === visibilityFilter ? <span>Active</span> : <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            store.dispatch({
                                type: 'SET_VISIBILITY_FILTER',
                                filter: 'ACTIVE'
                            })
                        }}
                    >Active</a>}
                    &nbsp;&nbsp;
                    {'COMPLETED' === visibilityFilter ? <span>Completed</span> : <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            store.dispatch({
                                type: 'SET_VISIBILITY_FILTER',
                                filter: 'COMPLETED'
                            })
                        }}
                    >Completed</a>}
                </p>
            </div>

        )
    }
}

const render = () => {
    ReactDom.render(
        <TodoApp {...store.getState()}/>,
        document.getElementById('root')
    )
};

store.subscribe(render);
render();



