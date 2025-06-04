import { Route, Routes } from "react-router"
import TodoList from "./components/todo"
import ImageCarousel from "./components/carosaul"
import './App.css'

function App() {
  

  return (
    <Routes>
      <Route index element={<h1>Home</h1>} />
      <Route path="todo" element={<TodoList />} />
      <Route path="carousel" element={<ImageCarousel />} />
    </Routes>
  )
}

export default App
