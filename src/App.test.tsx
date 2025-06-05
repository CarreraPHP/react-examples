import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { vi } from 'vitest'
import axios from 'axios'

vi.mock('@apollo/client', () => ({
  ApolloProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useQuery: vi.fn().mockReturnValue({ loading: true }),
  ApolloClient: class {},
  InMemoryCache: class {},
  HttpLink: class {},
  gql: () => undefined,
}))

import App from './App'

afterEach(() => {
  vi.clearAllMocks()
})

test('home route', () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  )
  expect(screen.getByText('Home')).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /todo list/i })).toBeInTheDocument()
})

test('todo route', async () => {
  vi.stubGlobal('fetch', vi.fn()
    .mockResolvedValueOnce({ json: () => Promise.resolve([{ id: 1, name: 'U' }]) })
    .mockResolvedValueOnce({ json: () => Promise.resolve([{ userId: 1, id: 1, title: 'A', completed: false }]) }))
  render(
    <MemoryRouter initialEntries={["/todo"]}>
      <App />
    </MemoryRouter>
  )
  await screen.findByText('A')
})

test('carousel route', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ json: () => Promise.resolve([]) }))
  render(
    <MemoryRouter initialEntries={["/carousel"]}>
      <App />
    </MemoryRouter>
  )
  await screen.findByText('No images found.')
})

test('graphql posts route', () => {
  render(
    <MemoryRouter initialEntries={["/graphql-posts"]}>
      <App />
    </MemoryRouter>
  )
  expect(screen.getByText('Loading...')).toBeInTheDocument()
})

test('todo axios route', async () => {
  vi.spyOn(axios, 'get').mockResolvedValue({ data: [] })
  render(
    <MemoryRouter initialEntries={["/todo-axios"]}>
      <App />
    </MemoryRouter>
  )
  await screen.findByRole('list')
})
