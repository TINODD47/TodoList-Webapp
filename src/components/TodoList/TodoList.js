import React, { useState, useEffect } from 'react'
import { Box, Button, Container, Checkbox, List, ListItem, ListItemText, ListItemIcon, ListItemButton, Grid, Icon, IconButton, Typography } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getTaskData, getTodoList, getResponse } from '../../redux/selectors/todo.selector';
import { getTasks, createTasks, deleteTasks, updateTasks, setResponseAction } from '../../redux/actions/todo.action';
import TodoForm from './AddForm/TodoForm';
import DeleteFormComp from './DeleteForm/DeleteForm';
import Notify from '../Notification/Notify';

const TodoList = (props) => {

    const { todoList, task, response, getTasks, createTasks, deleteTasks, updateTasks } = props;

    // Counting todos
    const [totalCount, setTotalCount] = useState(0)
    const [newCount, setNewCount] = useState(0)
    const [workingCount, setWorkingCount] = useState(0)
    const [completedCount, setCompletedCount] = useState(0)

    // Used Variablees
    const [addOpen, setAddOpen] = useState(false)
    const [editOpen, setEditOpen] = useState(false);
    const [editTodo, setEditTodo] = useState('false');
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleteTodoId, setDeleteTodoId] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [isFirstRendered, setFirstRendered] = useState(false);


    let bgColorCode = '#F5F5F5'
    let innerBgColorCode = '#e8e9ef'
    let addBtnColorCode = '#FF7043'
    let headingColorCode = '#455A64 '
    // let taskColorCode = '#616161  '

    const taskCounts = [
        { label: 'Total', count: totalCount, color: '#455A64' },
        { label: 'New', count: newCount, color: '#26A69A' },
        { label: 'Working', count: workingCount, color: '#29B6F6' },
        { label: 'Completed', count: completedCount, color: '#66BB6A' },
    ]

    const [completedtasks, setCompletedTasks] = useState([])

    const handleAddTask = (value) => {
        if (value) {
            createTasks(value);
        }
    }

    const handleCheckBox = (todo) => {
        let args = { ...todo }
        args.completed = !args.completed
        args.status = args.completed ? 'Completed' : 'New'
        updateTasks(args)
    }

    const handleAddClose = () => {
        setAddOpen(false);
    };
    const handleAlertClose = () => {
        setAlertOpen(false);
    };

    const handleEditOpen = (todo) => {
        setEditTodo(todo)
        setEditOpen(true);
    };
    const handleEditClose = () => {
        setEditOpen(false);
    };

    const handleEditTask = (editedTodo) => {
        updateTasks(editedTodo);
    };

    const handleDeleteOpen = (todo) => {
        setDeleteOpen(true)
        setDeleteTodoId(todo.id)
    }

    const handleDeleteClose = () => {
        setDeleteOpen(false);
    }
    const handleDeleteTodo = () => {
        deleteTasks(deleteTodoId);
    };

    useEffect(() => {
        getTasks();
        setFirstRendered(true)
        // console.log(response)
    }, []);

    useEffect(() => {
        if (isFirstRendered) {
            setAlertOpen(true)
        }
        // console.log("response changed", response)
    }, [response]);

    useEffect(() => {
        if (todoList) {
            setTotalCount(todoList.length)
            const Completed = todoList.filter(todo => todo.completed);
            const New = todoList.filter(todo => todo.status === 'New');
            const Working = todoList.filter(todo => todo.status === 'Working');
            setCompletedTasks(Completed);
            setNewCount(New.length)
            setWorkingCount(Working.length)
            setCompletedCount(Completed.length)
        }
    }, [todoList]);

    return (
        <Box sx={{
            backgroundColor: bgColorCode, display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
        }}>
            <Container width={'xl'} sx={{ minHeight: '100vh' }} >
                {alertOpen &&
                    <Notify open={alertOpen} onclose={handleAlertClose} response={response} />
                }
                {/* TOP Portion */}
                {
                    <Grid maxheight={'25%'} container padding={1} spacing={4} sx={{ paddingTop: '3%', flexGrow: 1 }}>
                        {taskCounts.map((cat, i) => (
                            <Grid item xs key={i} >
                                <Box sx={{ boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px", backgroundColor: cat['color'], height: "120px", width: '220px', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                        <Typography variant="h4" component="h4" color="white">
                                            {cat["label"]}
                                        </Typography>
                                        <Typography variant="h4" component="h4" color="white">
                                            {cat["count"]}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        ))}
                        <Grid item xs sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Box sx={{ borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Box>
                                    <IconButton aria-label="Add todo" sx={{ fontSize: '90px', color: addBtnColorCode }} onClick={() => { setAddOpen(true) }} >
                                        <AddCircleIcon fontSize="100px" />
                                    </IconButton>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                }
                {/* BOTTOM Portion */}
                {
                    <Grid container spacing={2} sx={{ paddingTop: '3%' }}>
                        {/* Todos box */}
                        <Grid item xs height={'auto'} sx={{ display: 'flex', width: '100%', flexDirection: 'column' }} >
                            <Box height={'100%'} sx={{
                                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", borderRadius: "2%", paddingTop: '10px', margin: '10px',
                                backgroundColor: innerBgColorCode ? innerBgColorCode : 'white',
                                height: '100%', display: 'flex', alignItems: 'start', justifyContent: "center"
                            }}>
                                <List sx={{ width: '90%', height: '100%', maxWidth: "auto" }}>
                                    <Typography variant="h4" component="h4" color={headingColorCode}>
                                        Todos
                                    </Typography>
                                    <Box>
                                        {todoList.length > 0
                                            ? todoList.map((todo, i) => {
                                                if (todo.completed) return null
                                                return (
                                                    <ListItem
                                                        sx={{
                                                            margin: '8px', color: "white", borderRadius: "5px",
                                                            backgroundColor: () => {
                                                                if (todo.status === 'New') return taskCounts[1].color
                                                                else if (todo.status === 'Working') return taskCounts[2].color
                                                                else return 'white'
                                                            }
                                                            , padding: '5px'
                                                        }}
                                                        key={i}
                                                        secondaryAction={
                                                            <Box >
                                                                <IconButton onClick={() => handleEditOpen(todo)} sx={{ color: 'white', marginRight: '10px' }} edge="end" aria-label="edit">
                                                                    <EditIcon />
                                                                </IconButton>
                                                                <IconButton onClick={() => { handleDeleteOpen(todo) }} sx={{ color: 'white', marginRight: '10px' }} edge="end" aria-label="delete">
                                                                    <DeleteOutlinedIcon />
                                                                </IconButton>
                                                            </Box>
                                                        }
                                                        disablePadding >
                                                        <ListItemButton role={undefined} dense>
                                                            <ListItemIcon>
                                                                <Checkbox sx={{ color: 'white' }}
                                                                    onClick={() => {
                                                                        handleCheckBox(todo)
                                                                    }}
                                                                    checked={todo.completed ? true : false}
                                                                    edge="start"
                                                                    tabIndex={-1}
                                                                    disableRipple
                                                                    inputProps={{ 'aria-labelledby': i }}
                                                                />
                                                            </ListItemIcon>
                                                            <ListItemText id={i}
                                                                primaryTypographyProps={{ fontSize: '20px' }}
                                                                primary={todo.task} />
                                                        </ListItemButton>
                                                    </ListItem>
                                                )
                                            })
                                            :
                                            <Typography variant="h6" component="h6" color="darkblue" sx={{ padding: '20px', textAlign: 'center' }} >
                                                No Todos
                                            </Typography>
                                        }
                                    </Box>
                                </List>
                            </Box>
                        </Grid>


                        {/* Completed todos box */}
                        <Grid item xs height={'auto'} sx={{ display: 'flex', width: '100%', flexDirection: 'column' }} >
                            <Box sx={{
                                backgroundColor: innerBgColorCode ? innerBgColorCode : 'white',
                                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", borderRadius: "2%", paddingTop: '10px', margin: '10px',
                                height: '100%', display: 'flex', alignItems: 'start', justifyContent: "center"
                            }}>
                                <List sx={{ width: '90%', height: '100%', maxWidth: "auto" }}>
                                    <Typography variant="h4" component="h4" color={headingColorCode}>
                                        Completed
                                    </Typography>
                                    <Box>
                                        {completedtasks.length > 0
                                            ? completedtasks.map((todo, i) => {
                                                return (
                                                    <ListItem
                                                        sx={{ margin: '8px', color: "white", borderRadius: "5px", backgroundColor: taskCounts[3].color, padding: '5px' }}
                                                        key={i}
                                                        secondaryAction={
                                                            <Box >
                                                                <IconButton onClick={() => handleEditOpen(todo)} sx={{ color: 'white', marginRight: '10px' }} edge="end" aria-label="edit">
                                                                    <EditIcon />
                                                                </IconButton>
                                                                <IconButton onClick={() => { handleDeleteOpen(todo) }} sx={{ color: 'white', marginRight: '10px' }} edge="end" aria-label="delete">
                                                                    <DeleteOutlinedIcon />
                                                                </IconButton>
                                                            </Box>
                                                        }
                                                        disablePadding
                                                    >
                                                        <ListItemButton role={undefined} dense>
                                                            <ListItemIcon>
                                                                <Checkbox
                                                                    // sx={{ color: 'white', accentColor: 'red' }}
                                                                    sx={{
                                                                        color: 'white',
                                                                        '&.Mui-checked': {
                                                                            color: 'green', // Change the color when checked
                                                                        },
                                                                    }}
                                                                    onClick={() => {
                                                                        handleCheckBox(todo)
                                                                    }}
                                                                    checked={todo.completed ? true : false}
                                                                    edge="start"
                                                                    tabIndex={-1}
                                                                    disableRipple
                                                                    inputProps={{ 'aria-labelledby': i }}
                                                                />
                                                            </ListItemIcon>
                                                            <ListItemText id={i}
                                                                primaryTypographyProps={{ fontSize: '20px' }}
                                                                primary={todo.task} />
                                                        </ListItemButton>
                                                    </ListItem>
                                                )
                                            })
                                            :
                                            <Typography variant="h6" component="h6" color="darkblue" sx={{ padding: '20px', textAlign: 'center' }} >
                                                No Completed Todos
                                            </Typography>}
                                    </Box>
                                </List>
                            </Box>
                        </Grid>
                    </Grid >
                }
                {/* For ADD FORM  */}
                {
                    addOpen && <TodoForm buttonText={"Add Todo"} open={addOpen} onClose={handleAddClose} handleAdd={handleAddTask} />
                }
                {/* For EDIT FORM  */}
                {
                    editOpen && <TodoForm formTitle={"Edit Todo"} buttonText={"Update Todo"} formValues={editTodo} open={editOpen} onClose={handleEditClose} handleAdd={handleEditTask} />
                }
                {/* For DELETE FORM  */}
                {
                    deleteOpen && <DeleteFormComp formValues={editTodo} open={deleteOpen} onClose={handleDeleteClose} deleteTask={handleDeleteTodo} />
                }
            </Container >
        </Box>
    )
}

const mapStateToProps = (state) => {
    return {
        todoList: getTodoList(state),
        task: getTaskData(state),
        response: getResponse(state)
    };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getTasks,
            createTasks,
            deleteTasks,
            updateTasks,
            setResponseAction
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);