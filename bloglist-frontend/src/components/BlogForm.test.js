import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import BlogFrom from './BlogForm'

test('blog information correct when created', async() => {

  const user = userEvent.setup()
  const mockHandler = jest.fn()

  render(<BlogFrom createBlog={ mockHandler }/>)

  const nameInput = screen.getByPlaceholderText('blog name')
  const authorInput = screen.getByPlaceholderText('blog author')
  const urlInput = screen.getByPlaceholderText('blog url')
  const button = screen.getByText('create')

  await userEvent.type(nameInput, 'new blog name' )
  await userEvent.type(authorInput, 'new blog author' )
  await userEvent.type(urlInput, 'new blog url' )
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0].title).toBe('new blog name')
  expect(mockHandler.mock.calls[0][0].author).toBe('new blog author')
  expect(mockHandler.mock.calls[0][0].url).toBe('new blog url')

})
