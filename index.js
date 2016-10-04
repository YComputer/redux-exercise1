var Redux = require('redux');
var React = require('react');
var ReactDom = require('react-dom');

const todo = (state, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                id: action.id,
                text: action.text,
                completed: false
            };

        case 'TOGGLE':
            if (state.id === action.id) {
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
            return state.map(t => todo(t, action));
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

const todoApp = Redux.combineReducers({
    todos,
    visibilityFilter
});

const store = Redux.createStore(todoApp);


const FilterLink = ({
    filter,
    currentFilter,
    children
}) => {
    if(filter === currentFilter){
        return <span>{children}</span>
    }
    return (
        <a href="#"
           onClick={e => {
               e.preventDefault();
               store.dispatch({
                   type: 'SET_VISIBILITY_FILTER',
                   filter
               })
           }}
        >
            {children}
        </a>
    )
}

// const FilterLink = (props) => {
//     return (
//         <a href="#"
//            onClick={e => {
//                e.preventDefault();
//                store.dispatch({
//                    type: 'SET_VISIBILITY_FILTER',
//                    filter: props.filter
//                })
//            }}
//         >
//             {props.children}
//         </a>
//     )
// }

// class FilterLink extends React.Component {
//     render() {
//         return (
//             <a href="#"
//                onClick={e => {
//                    e.preventDefault();
//                    store.dispatch({
//                        type: 'SET_VISIBILITY_FILTER',
//                        filter: this.props.filter
//                    })
//                }}
//             >
//                 {this.props.children}
//             </a>
//         )
//     }
// }

const getVisibleTodos = (todos, filter) => {
    switch (filter){
        case 'SHOW_ALL':
            return todos;
        case 'SHOW_COMPLETED':
            return todos.filter(
                t => t.completed
            );
        case 'SHOW_ACTIVE':
            return todos.filter(
                t => !t.completed
            )
    }
};

let nextTodoId = 0;
class TodoApp extends React.Component {
    render() {
        const {todos, visibilityFilter} = this.props;
        const visibleTodos = getVisibleTodos(todos, visibilityFilter);
        return (
            <div>
                <input ref={node => {
                    this.input = node;
                }}/>
                <button onClick={()=> {
                    store.dispatch({
                        type: 'ADD_TODO',
                        text: this.input.value,
                        id: nextTodoId++
                    });
                    this.input.value = ''
                }}>
                    Add Todo
                </button>
                <ul>
                    {visibleTodos.map(todo =>
                        <li key={todo.id}
                            onClick={() => {
                                store.dispatch({
                                    type: 'TOGGLE',
                                    id: todo.id
                                })
                            }}
                            style={{
                                textDecoration: todo.completed ? 'line-through' : 'none'
                            }}>
                            {todo.text}
                        </li>
                    )}
                </ul>
                <p>
                    Show:{' '}
                    <FilterLink filter="SHOW_ALL" currentFilter={visibilityFilter}>All</FilterLink>{' '}
                    <FilterLink filter="SHOW_ACTIVE" currentFilter={visibilityFilter}>Active</FilterLink>{' '}
                    <FilterLink filter="SHOW_COMPLETED" currentFilter={visibilityFilter}>Completed</FilterLink>
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














