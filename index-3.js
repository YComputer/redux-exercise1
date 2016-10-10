import expect from 'expect';
import deepFreeze from 'deep-freeze';
import {createStore, combineReducers} from 'redux';
import ReactDom from 'react-dom';
import React from 'react';

const visibilityFilter = (state = 'SHOW_ALL', action) => {
    // console.log('----reducer filter invoked--------');
    switch (action.type){
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    }
};

const todo = (state, action) => {
    // console.log('----reducer todo invoked------');
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
    // console.log('----reducer todos invoked------');
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
});

const store = createStore(todoApp);

class Link extends React.Component{
    render() {
        if(this.props.active){
            return <span>{this.props.children}</span>
        }

        return (
            <a href="#"
               onClick={e => {
                   e.preventDefault();
                   this.props.onClick()
               }}>
                {this.props.children}
            </a>
        )
    }
}

class FilterLink extends React.Component{

    componentDidMount(){
        this.unsubscribe = store.subscribe(() =>
            this.forceUpdate()
        );
    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    render(){
        const props = this.props;
        const state = store.getState();
        return(
            <Link
                active={
                    props.filter ===
                    state.visibilityFilter
                }
                onClick={() => {
                    store.dispatch({
                        type: 'SET_VISIBILITY_FILTER',
                        filter: props.filter
                    })
                }}
            >
                {props.children}
            </Link>
        )
    }
}

class Footer extends React.Component{
    render(){
        return (
            <p>
                Show:{' '}
                <FilterLink
                    filter='SHOW_ALL'
                >
                    All
                </FilterLink>
                {', '}
                <FilterLink
                    filter='SHOW_ACTIVE'
                >
                    Active
                </FilterLink>
                {', '}
                <FilterLink
                    filter='SHOW_COMPLETED'
                >
                    Completed
                </FilterLink>
            </p>
        )
    }
}

class Todo extends React.Component{
    render() {
        return (
            <li
                onClick={this.props.onClick}
                style={{
                    textDecoration:
                        this.props.completed ?
                            'line-through':
                            'none'
                }}>
                {this.props.text}
            </li>
        )
    }
}

class TodoList extends React.Component{
    render() {
        // const {todos} = this.props.todos;
        return (
            <ul>
                {this.props.todos.map(todo =>
                    <Todo
                        key={todo.id}
                        {...todo}
                        onClick={() => this.props.onTodoClick(todo.id)}
                    />
                )}
            </ul>
        )
    }
}

class AddTodo extends React.Component{
    render(){
        let input;
        return(
            <div>
                <input ref={node => {
                    input = node;
                }}/>
                <button onClick={()=> {
                    store.dispatch({
                        type: 'ADD_TODO',
                        text:input.value,
                        id: nextTodoId++
                    })
                    input.value = '';
                }}>
                    Add Todo
                </button>
            </div>
        )
    }
}

const getVisibleTodos = (todos, filter) => {
    switch (filter){
        case 'SHOW_ALL':
            return todos;
        case 'SHOW_ACTIVE':
            return todos.filter((todo)=>{
                return !todo.completed;
            });
        case 'SHOW_COMPLETED':
            return todos.filter((todo)=>{
                return todo.completed;
            });
    }
};

class VisibleTodoList extends React.Component{
    componentDidMount(){
        this.unsubscribe = store.subscribe(() =>
            this.forceUpdate()
        );
    }

    componentWillUnmount(){
        this.unsubscribe();
    }
    render(){
        const props = this.props;
        const state = store.getState();

        return(
            <TodoList
                todos={
                    getVisibleTodos(
                        state.todos,
                        state.visibilityFilter
                    )
                }
                onTodoClick={id =>
                    store.dispatch({
                        type: 'TOGGLE_TODO',
                        id:id
                    })
                }
            />
        )
    }
}

let nextTodoId = 0;
const TodoApp = () =>(
    <div>
        <AddTodo />
        <VisibleTodoList />
        <Footer />
    </div>
);

ReactDom.render(
    <TodoApp />,
    document.getElementById('root')
);












