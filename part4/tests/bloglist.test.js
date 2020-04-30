const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]

    const listWithZeroBlogs = []

    const listWithThreeBlogs = [
        {
          _id: '5a422aa71b54a676234d16t3',
          title: 'Testailua',
          author: 'Matti Keränen',
          url: 'http://www.google.com',
          likes: 5,
          __v: 0
        },
        {
            _id: '5a422aa71b54a111134d17f1',
            title: 'Fullstack course',
            author: 'Kalle Hietanen',
            url: 'http://www.wikipedia.com',
            likes: 22,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 0,
            __v: 0
        }
      ]
  
    test('when list has only one blog function returns the likes of that blog', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      expect(result).toBe(5)
    })
    test('when list has zero blogs the total likes are 0', () => {
        const result = listHelper.totalLikes(listWithZeroBlogs)
        expect(result).toBe(0)
    })
    test('when list has three blogs the likes equals the sum of likes for those three blogs (in this test case 27)', () => {
        const result = listHelper.totalLikes(listWithThreeBlogs)
        expect(result).toBe(27)
    })
  })

describe('favorite blog', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]

    const listWithZeroBlogs = []

    const listWithThreeBlogs = [
        {
          _id: '5a422aa71b54a676234d16t3',
          title: 'Testailua',
          author: 'Matti Keränen',
          url: 'http://www.google.com',
          likes: 5,
          __v: 0
        },
        {
            _id: '5a422aa71b54a111134d17f1',
            title: 'Fullstack course',
            author: 'Kalle Hietanen',
            url: 'http://www.wikipedia.com',
            likes: 22,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 0,
            __v: 0
        }
    ]
  
    test('when list has only one blog this blog gets returned', () => {
      const result = listHelper.favoriteBlog(listWithOneBlog)
      expect(result).toEqual(listWithOneBlog[0])
    })
    test('when list has zero blogs null is returned', () => {
        const result = listHelper.favoriteBlog(listWithZeroBlogs)
        expect(result).toBe(null)
    })
    test('when list has three blogs the blog with most likes gets returned.', () => {
        const result = listHelper.favoriteBlog(listWithThreeBlogs)
        expect(result).toEqual(listWithThreeBlogs[1])
    })
})

describe('most blogs', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]

    const listWithZeroBlogs = []

    const listWithFourBlogs = [
        {
          _id: '5a422aa71b54a676234d16t3',
          title: 'Testailua',
          author: 'Matti Keränen',
          url: 'http://www.google.com',
          likes: 5,
          __v: 0
        },
        {
            _id: '5a422aa71b54a111134d17f1',
            title: 'Fullstack course',
            author: 'Kalle Hietanen',
            url: 'http://www.wikipedia.com',
            likes: 22,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 0,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d086t',
            title: 'Testailua part 2',
            author: 'Matti Keränen',
            url: 'http://www.facebook.com',
            likes: 5,
            __v: 0
          },
    ]

    const listWithFiveBlogs = [
        {
          _id: '5a422aa71b54a676234d16t3',
          title: 'Testailua',
          author: 'Matti Keränen',
          url: 'http://www.google.com',
          likes: 5,
          __v: 0
        },
        {
            _id: '5a422aa71b54a111134d17f1',
            title: 'Fullstack course',
            author: 'Kalle Hietanen',
            url: 'http://www.wikipedia.com',
            likes: 22,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 0,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d086t',
            title: 'Testailua part 2',
            author: 'Matti Keränen',
            url: 'http://www.facebook.com',
            likes: 7,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d1112',
            title: 'Testailua part 3',
            author: 'Matti Keränen',
            url: 'http://www.wsj.com',
            likes: 11,
            __v: 0
        },
    ]
  
    test('when list has only one blog this blog gets returned', () => {
      const result = listHelper.mostBlogs(listWithOneBlog)
      expect(result).toEqual({author: "Edsger W. Dijkstra", blogs: 1})
    })
    test('when list has zero blogs null is returned', () => {
        const result = listHelper.mostBlogs(listWithZeroBlogs)
        expect(result).toBe(null)
    })
    test('when list has four blogs and top blogger has 2 blogs.', () => {
        const result = listHelper.mostBlogs(listWithFourBlogs)
        expect(result).toEqual({author: "Matti Keränen", blogs: 2})
    })
    test('when list has five blogs and top blogger has 3 blogs.', () => {
        const result = listHelper.mostBlogs(listWithFiveBlogs)
        expect(result).toEqual({author: "Matti Keränen", blogs: 3})
    })
})

describe('most likes', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]

    const listWithZeroBlogs = []

    const listWithFourBlogs = [
        {
          _id: '5a422aa71b54a676234d16t3',
          title: 'Testailua',
          author: 'Matti Keränen',
          url: 'http://www.google.com',
          likes: 5,
          __v: 0
        },
        {
            _id: '5a422aa71b54a111134d17f1',
            title: 'Fullstack course',
            author: 'Kalle Hietanen',
            url: 'http://www.wikipedia.com',
            likes: 22,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 0,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d086t',
            title: 'Testailua part 2',
            author: 'Matti Keränen',
            url: 'http://www.facebook.com',
            likes: 5,
            __v: 0
          },
    ]

    const listWithFiveBlogs = [
        {
          _id: '5a422aa71b54a676234d16t3',
          title: 'Testailua',
          author: 'Matti Keränen',
          url: 'http://www.google.com',
          likes: 15,
          __v: 0
        },
        {
            _id: '5a422aa71b54a111134d17f1',
            title: 'Fullstack course',
            author: 'Kalle Hietanen',
            url: 'http://www.wikipedia.com',
            likes: 22,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 0,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d086t',
            title: 'Testailua part 2',
            author: 'Matti Keränen',
            url: 'http://www.facebook.com',
            likes: 5,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d1112',
            title: 'Testailua part 3',
            author: 'Matti Keränen',
            url: 'http://www.wsj.com',
            likes: 11,
            __v: 0
        },
    ]
  
    test('when list has only one blog likes of this blog gets returned', () => {
      const result = listHelper.mostLikes(listWithOneBlog)
      expect(result).toEqual({author: "Edsger W. Dijkstra", likes: 5})
    })
    test('when list has zero blogs null is returned', () => {
        const result = listHelper.mostLikes(listWithZeroBlogs)
        expect(result).toBe(null)
    })
    test('when list has four blogs and top author has 22 likes', () => {
        const result = listHelper.mostLikes(listWithFourBlogs)
        expect(result).toEqual({author: "Kalle Hietanen", likes: 22})
    })
    test('when list has five blogs and top blogger has 3 blogs and 31 combined likes.', () => {
        const result = listHelper.mostLikes(listWithFiveBlogs)
        expect(result).toEqual({author: "Matti Keränen", likes: 31})
    })
})