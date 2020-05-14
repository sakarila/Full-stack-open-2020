describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const newUser = {
      username: 'Masa',
      name: 'Matti Luukkainen',
      password: 'salasana',
    }

    cy.request('POST', 'http://localhost:3003/api/users', newUser)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('Masa')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()

      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('Masa')
      cy.get('#password').type('anasalas')
      cy.get('#login-button').click()

      cy.contains('Wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('Masa')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('testailua')
      cy.get('#author').type('Masa')
      cy.get('#url').type('www.google.com')

      cy.contains('create').click()
      cy.contains('new blog testailua by Masa added!')
    })
  })

  describe('When logged in and blog post exists', function() {
    beforeEach(function() {
      cy.get('#username').type('Masa')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()

      cy.contains('new blog').click()
      cy.get('#title').type('testailua')
      cy.get('#author').type('Masa')
      cy.get('#url').type('www.google.com')
      cy.contains('create').click()
    })

    it('A user can like blog post', function() {
      cy.contains('view').click()
      cy.contains('like').click()

      cy.get('#extra-info').should('contain', '1')
    })

    it('A user can delete his/her own post', function() {
      cy.contains('view').click()
      cy.contains('remove').click()

      cy.get('.blog-post').should('not.exist')
    })
  })
})
