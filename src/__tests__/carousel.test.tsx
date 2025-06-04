import { render, screen, fireEvent } from '@testing-library/react'
import Carousel from '../components/carosaul'
import { vi } from 'vitest'

const photos = [
  { albumId: 1, id: 1, title: 'p1', url: 'u1', thumbnailUrl: '' },
  { albumId: 1, id: 2, title: 'p2', url: 'u2', thumbnailUrl: '' },
]

afterEach(() => {
  vi.restoreAllMocks()
})

test('renders images and navigates', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ json: () => Promise.resolve(photos) }))
  render(<Carousel />)
  expect(screen.getByText(/Loading/)).toBeInTheDocument()
  await screen.findByText('p1')
  expect(screen.getByRole('img')).toHaveAttribute('src', 'u1')
  fireEvent.click(screen.getByText('Previous'))
  expect(screen.getByRole('img')).toHaveAttribute('src', 'u2')
  fireEvent.click(screen.getByText('Next'))
  expect(screen.getByRole('img')).toHaveAttribute('src', 'u1')
  fireEvent.click(screen.getByText('Next'))
  expect(screen.getByRole('img')).toHaveAttribute('src', 'u2')
})

test('handles empty response', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ json: () => Promise.resolve([]) }))
  render(<Carousel />)
  await screen.findByText('No images found.')
})
