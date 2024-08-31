import React from 'react'
import TodoList from './Components/TodoList/TodoList'
import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// import axios from 'axios'

// Todolist WorkOut
// import TodoList from './Components/TodoListWorkout/TodoList'

const Home = () => <h1>Home</h1>
const About = () => <h1>About</h1>

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/todo' element={<TodoList />} />
      </Routes>
    </Router>
  )
}

export default App