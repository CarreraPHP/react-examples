import { render, screen } from '@testing-library/react'
import ApolloPosts from './index'
import { vi } from 'vitest'

vi.mock('@apollo/client', () => ({
  ApolloProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useQuery: vi.fn(),
  ApolloClient: class {},
  InMemoryCache: class {},
  HttpLink: class {},
  gql: () => ({}),
}))

import { useQuery } from '@apollo/client'
const mockedUseQuery = useQuery as unknown as vi.Mock

afterEach(() => {
  vi.clearAllMocks()
})

test('loading state', () => {
  mockedUseQuery.mockReturnValue({ loading: true })
  render(<ApolloPosts />)
  expect(screen.getByText('Loading...')).toBeInTheDocument()
})

test('error state', () => {
  mockedUseQuery.mockReturnValue({ loading: false, error: { message: 'err' } })
  render(<ApolloPosts />)
  expect(screen.getByText('Error: err')).toBeInTheDocument()
})

test('renders posts', () => {
  mockedUseQuery.mockReturnValue({ loading: false, error: undefined, data: { posts: { data: [{ id: '1', title: 't1', body: 'b1' }] } } })
  render(<ApolloPosts />)
  expect(screen.getByText(/t1/)).toBeInTheDocument()
})
