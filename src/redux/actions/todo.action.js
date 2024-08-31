import axios from "axios"

export const SET_TODOLIST = 'SET_TODOLIST';
export const setTodoList = (todo) => ({
    type: SET_TODOLIST,
    payload: todo,
});

export const UPDATE_TODO = 'UPDATE_TODO';
export const updateTask = (todo) => ({
    type: UPDATE_TODO,
    payload: todo,
});

export const SET_RESPONSE = 'SET_RESPONSE';
export const setResponseAction = (ms) => ({
    type: SET_RESPONSE,
    payload: ms,
});

let errorResponse = { message: 'Server Error', severity: 'error' }

export const getTasks = () => async (dispatch) => {
    try {
        const response = await axios.get("http://localhost:5001/todo");
        const taskData = response.data.data.tododata
        const ms = response.data
        dispatch(setTodoList(taskData))
        console.log(ms);
    } catch (error) {
        console.log(error)
        errorResponse.message = error.message
        dispatch(setResponseAction(errorResponse))
    }
}

export const createTasks = (args) => async (dispatch) => {
    try {
        const response = await axios.post("http://localhost:5001/todo", args);
        const ms = response.data
        console.log(ms);
        dispatch(setResponseAction(ms));
        dispatch(getTasks());
    } catch (error) {
        console.log(error)
        errorResponse.message = error.message
        dispatch(setResponseAction(errorResponse))
    }
}

export const updateTasks = (args) => async (dispatch) => {
    try {
        const response = await axios.put("http://localhost:5001/todo", args);
        // console.log(JSON.stringify(response))
        const ms = response.data
        console.log(ms);
        dispatch(setResponseAction(ms))
        dispatch(getTasks())
    } catch (error) {
        console.log(error)
        errorResponse.message = error.message
        dispatch(setResponseAction(errorResponse))
    }
}

export const deleteTasks = (id) => async (dispatch) => {
    try {
        const response = await axios.delete("http://localhost:5001/todo", {
            data: {
                "id": id
            }
        })
        // console.log(JSON.stringify(response))
        const ms = response.data
        console.log(ms);
        dispatch(setResponseAction(ms))
        dispatch(getTasks())
    } catch (error) {
        console.log(error)
        errorResponse.message = error.message
        dispatch(setResponseAction(errorResponse))
    }
}
