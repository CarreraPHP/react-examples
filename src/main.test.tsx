import { vi } from 'vitest'

const renderMock = vi.fn()
vi.mock('react-dom/client', () => ({
  createRoot: vi.fn(() => ({ render: renderMock }))
}))

document.body.innerHTML = '<div id="root"></div>'

const mainImport = import('./main')
import { createRoot } from 'react-dom/client'

test('main renders app', async () => {
  await mainImport
  expect(createRoot).toHaveBeenCalled()
  expect(renderMock).toHaveBeenCalled()
})
