import { Link } from 'react-router'

const Home = () => (
  <div>
    <h1>Home</h1>
    <nav>
      <ul>
        <li><Link to="todo">Todo List</Link></li>
        <li><Link to="carousel">Carousel</Link></li>
        <li><Link to="graphql-posts">GraphQL Posts</Link></li>
        <li><Link to="todo-axios">Todo Axios</Link></li>
      </ul>
    </nav>
  </div>
)

export default Home
