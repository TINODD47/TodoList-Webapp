import { combineReducers } from "redux";
import todoReducer from './todo.reducer'

const rootReducer = combineReducers({
    todoList: todoReducer,
})

export default rootReducer