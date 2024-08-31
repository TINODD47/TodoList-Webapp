import {createSelector} from 'reselect'
export const todoSelector=(state)=>state.todoList
// export const responseSelector=(state)=>state.response
export const getTodoList=createSelector(
    [todoSelector],
    todoSelector=>todoSelector.todo
);
export const getTaskData=createSelector(
    [todoSelector],
    todoSelector=>todoSelector.task
);
export const getResponse=createSelector(
    [todoSelector],
    todoSelector=>todoSelector.response
);