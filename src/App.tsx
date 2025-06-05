import { Route, Routes } from "react-router"
import TodoList from "./components/todo"
import ImageCarousel from "./components/carosaul"
import ApolloPosts from "./components/postsApollo"
import TodoAxios from "./components/todoAxios"
import Home from "./components/home"
import './App.css'

function App() {
  

  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="todo" element={<TodoList />} />
      <Route path="carousel" element={<ImageCarousel />} />
      <Route path="graphql-posts" element={<ApolloPosts />} />
      <Route path="todo-axios" element={<TodoAxios />} />
    </Routes>
  )
}

export default App
