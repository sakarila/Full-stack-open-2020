import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


describe('<Blog />', () => {
  let component

  beforeEach(() => {
    const blog = {
      author: 'Timo Nieminen',
      id: '5ebbb14a6f22af56f0fe6455',
      likes: 5,
      title: 'testi',
      url: 'www.hs.fi',
      user: {
        id: '5eb98a6c31dbd97b1c8098f2',
        name: 'Janne Nieminen',
        username: 'testi'
      }
    }

    component = render(
      <Blog blog={blog} />
    )
  })

  test('displays by default blog`s title and author but not url or number of likes', () => {

    expect(component.container).toHaveTextContent('testi')
    expect(component.container).toHaveTextContent('Timo Nieminen')

    const div = component.container.querySelector('.extraInfo')
    expect(div).toHaveStyle('display: none')
  })

  test('blog`s url and number of likes are shown when button controlling the details has been clicked', () => {

    const button = component.getByText('view')
    fireEvent.click(button)

    const div = component.container.querySelector('.extraInfo')
    expect(div).not.toHaveStyle('display: none')
  })
})