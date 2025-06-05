import { render, screen, fireEvent } from '@testing-library/react'
import TodoList from './index'
import { vi } from 'vitest'

const users = [
  { id: 1, name: 'User1' },
  { id: 2, name: 'User2' },
]

const todos = [
  { userId: 1, id: 1, title: 'first', completed: false },
  { userId: 2, id: 2, title: 'second', completed: true },
]

afterEach(() => {
  vi.restoreAllMocks()
})

test('loads and filters todos', async () => {
  const fetchMock = vi.fn()
    .mockResolvedValueOnce({ json: () => Promise.resolve(users) })
    .mockResolvedValueOnce({ json: () => Promise.resolve(todos) })
  vi.stubGlobal('fetch', fetchMock)
  render(<TodoList />)
  await screen.findByText('first')
  expect(screen.getAllByRole('checkbox').length).toBe(2)
  const input = screen.getByRole('textbox')
  fireEvent.change(input, { target: { value: 'second' } })
  expect(screen.queryByText('first')).not.toBeInTheDocument()
  const select = screen.getByRole('combobox')
  fireEvent.change(select, { target: { value: 'COMPLETED' } })
  const boxes = await screen.findAllByRole('checkbox')
  expect(boxes.length).toBe(1)
  fireEvent.click(boxes[0])
  expect(boxes[0]).not.toBeChecked()
  fireEvent.change(select, { target: { value: 'INCOMPLETE' } })
  expect(await screen.findAllByRole('checkbox')).toHaveLength(1)
})
