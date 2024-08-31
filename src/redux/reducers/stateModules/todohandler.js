import { Description } from "@mui/icons-material"

export const setTodo = (state, action) => ({
    ...state,
    todo: action.payload
})

export const setTask = (state, action) => ({
    ...state,
    task: {
        ...action.payload,
    }
})

export const updateTask = (state, action) => ({
    ...state,
    task: {
        ...action.payload,
        // value: action.payload.value,
        // description: action.payload.description,
        // completed: action.payload.completed
    }
})

export const setResponse = (state, action) => ({
    ...state,
    response: {
        message: action.payload.message,
        severity: action.payload.severity
    }
})
