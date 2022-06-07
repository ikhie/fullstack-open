import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'test blog',
    author: 'Test Test',
    url: 'https://*',
    name: 'test',
    likes: 2
  }

  const { container } = render(<Blog blog={blog} />)

  const element = screen.getByText('test blog Test Test')
  expect(element).toBeDefined()


  const info = container.querySelector('style[display=\'none\']')
  expect(info).toBeDefined()

})

test('show info when button pressed', async() => {

  const user = userEvent.setup()
  const blog = {
    title: 'test blog',
    author: 'Test Test',
    url: 'https://*',
    name: 'test',
    likes: 2
  }

  const { container } = render(<Blog blog={blog} />)

  const button = screen.getByText('view')

  await user.click(button)

  const info = container.querySelector('style[display=\'none\']')
  expect(info).toBeNull()

})

test('like button presses twice', async() => {
  const user = userEvent.setup()
  const blog = {
    title: 'test blog',
    author: 'Test Test',
    url: 'https://*',
    name: 'test',
    likes: 2
  }

  const mockHandler = jest.fn()

  render(<Blog blog={blog} updateBlog={ mockHandler } />)

  const button = screen.getByText('like')

  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
