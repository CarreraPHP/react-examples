import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import Home from '../components/home'

test('renders navigation links', () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  )
  expect(screen.getByText('Home')).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /todo list/i })).toHaveAttribute('href', '/todo')
  expect(screen.getByRole('link', { name: /carousel/i })).toHaveAttribute('href', '/carousel')
  expect(screen.getByRole('link', { name: /graphql posts/i })).toHaveAttribute('href', '/graphql-posts')
  expect(screen.getByRole('link', { name: /todo axios/i })).toHaveAttribute('href', '/todo-axios')
})
