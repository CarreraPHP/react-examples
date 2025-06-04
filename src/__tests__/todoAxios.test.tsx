import { render, screen, waitFor } from '@testing-library/react'
import TodoAxios from '../components/todoAxios'
import axios from 'axios'
import { vi } from 'vitest'

afterEach(() => {
  vi.restoreAllMocks()
})

test('renders todos from axios', async () => {
  vi.spyOn(axios, 'get').mockResolvedValue({ data: [{ id: 1, title: 'a', completed: true }] })
  render(<TodoAxios />)
  expect(screen.getByText(/Loading/)).toBeInTheDocument()
  await screen.findByText('a')
  expect(screen.getByRole('checkbox')).toBeChecked()
})

test('handles axios error', async () => {
  vi.spyOn(axios, 'get').mockRejectedValue(new Error('fail'))
  render(<TodoAxios />)
  await waitFor(() => expect(screen.queryByText(/Loading/)).not.toBeInTheDocument())
  expect(screen.queryAllByRole('listitem').length).toBe(0)
})
