import {
    setTodo,
    updateTask,
    setResponse
} from './stateModules'

const DEFAULT_STATE = {
    todo: [],
    task: {
        "task": "",
        "description": "",
        "completed": false,
        "status": "New",
        "startdate": "",
        "duedate": "",
    },
    response: {
        message: ' ',
        severity: 'success'
    }
}

const todoReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case 'SET_TODOLIST':
            return setTodo(state, action)
        case 'UPDATE_TASK':
            return updateTask(state, action)
        case 'SET_RESPONSE':
            return setResponse(state, action)
        default:
            return state;
    }
}
export default todoReducer