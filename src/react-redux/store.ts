import { createStore, combineReducers, Action, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import { connectRouter } from 'connected-react-router';


export interface ToDo {
    id?: number;
    text: string,
    completed?: boolean
}

export interface Store {
    todos: ToDo[];
}

interface ToDoReducer extends Action<'GET' | 'ADD' | 'UPDATE' | 'DELETE' | 'TOGGLE'> {
    todo?: ToDo;
    todos?: ToDo[];
}

const initTodos: ToDo[] = [{
    id: 1,
    text: 'Todo 01',
    completed: false
}, {
    id: 2,
    text: 'Todo 02',
    completed: false
}]

const todoReducer = (state: ToDo[] = [], action: ToDoReducer) => {
    switch (action.type) {
        case 'GET':
            return action.todos;
        case 'ADD':
            return [
                ...state,
                { ...action.todo, id: Math.random() }
            ];

        case 'UPDATE':
            const updatingTodo = state.find(o => o.id === action.todo.id);
            if (!updatingTodo) {
                return state;
            }

            updatingTodo.text = action.todo.text;
            updatingTodo.completed = action.todo.completed;

            return [...state];
        case 'TOGGLE':
            const toggleTodo = state.find(o => o.id === action.todo.id);
            if (!toggleTodo) {
                return state;
            }

            toggleTodo.completed = !toggleTodo.completed;

            return [...state];
        case 'DELETE':
            return state.filter(o => o.id !== action.todo.id);
        default:
            return state;
    }
}

const reducers = combineReducers<Store>({
    todos: todoReducer
})

const loggerMiddleware = (store) => {
    return (next) => {
        return (action) => {
            console.log('loggerMiddleware');
            return next(action);
        }
    }
}

const postTodoMiddleware = (store) => (next) => (action) => {
    if (action.type !== 'ADD') {
        return next(action);
    }

    next({
        type: 'SHOW_TODO_LOADING',
        loading: true
    });

    fetch(
        'http://localhost:3000/api/todos',
        {
            body: JSON.stringify(action.todo),
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json; charset=utf-8'
            })
        }
    )
        .then(response => {
            response.json().then(result => {
                next({
                    ...action,
                    todo: result
                });
            })
        })
        .catch(o => {
            alert('POST FAILED!');
        })
        .finally(() => {
            next({
                type: 'SHOW_TODO_LOADING',
                loading: false
            });
        });
}


const getTodosMiddleware = (store) => (next) => (action) => {
    if (action.type !== 'GET') {
        return next(action);
    }

    next({
        type: 'SHOW_TODO_LOADING',
        loading: true
    });

    const search = new URLSearchParams();
    if(action.completed !== undefined && action.completed !== null) {
        search.set('completed', action.completed);
    }

    fetch(`http://localhost:3000/api/todos?${search.toString()}`)
        .then(response => {
            response.json().then(result => {
                next({
                    ...action,
                    todos: result
                });
            })
        })
        .catch(o => {
            alert('POST FAILED!');
        })
        .finally(() => {
            next({
                type: 'SHOW_TODO_LOADING',
                loading: false
            });
        });
}

const deleteTodoMiddleware = (store) => (next) => (action) => {
    if (action.type !== 'DELETE') {
        return next(action);
    }

    next({
        type: 'SHOW_TODO_LOADING',
        loading: true
    });

    fetch(
        'http://localhost:3000/api/todos',
        {
            body: JSON.stringify(action.todo),
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json; charset=utf-8'
            })
        }
    )
        .then(response => {
            response.json().then(result => {
                next({
                    ...action,
                    todo: result
                });
            })
        })
        .catch(o => {
            alert('DELETE FAILED!');
        })
        .finally(() => {
            next({
                type: 'SHOW_TODO_LOADING',
                loading: false
            });
        });
}

export const history = createBrowserHistory()

export const store = createStore(
    connectRouter(history),
    // reducers,
    applyMiddleware(loggerMiddleware, postTodoMiddleware, getTodosMiddleware, deleteTodoMiddleware)
)

export const getTodos = (completed?: boolean) => ({
    type: 'GET',
    completed
})

export const addTodo = (todo: ToDo): ToDoReducer => ({
    type: 'ADD',
    todo
});

export const updateTodo = (todo: ToDo): ToDoReducer => ({
    type: 'UPDATE',
    todo
});

export const deleteTodo = (todo: ToDo): ToDoReducer => ({
    type: 'DELETE',
    todo
});

export const toggleTodo = (todo: ToDo): ToDoReducer => ({
    type: 'TOGGLE',
    todo
});