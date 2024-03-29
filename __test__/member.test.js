const request = require('supertest')
const app = require('../src/index')

// Member
const baseUrl = `http://localhost:3001/api`

describe(`GET ${baseUrl}/images`,() => {
    it('Array images', (done) => {
        request(app)
        .get('/api/images')
        .then(response => {
            const { status,body } = response
            expect(status).toBe(200)
            expect(body).toEqual(expect.arrayContaining(body))
            done()
        })
        .catch(err => {
            console.log(err,"<<<<<")
            done()
        })
    })
})

describe(`GET ${baseUrl}/news`,() => {
    it('Array news', (done) => {
        request(app)
        .get('/api/news')
        .then(response => {
            const { status,body } = response
            expect(status).toBe(200)
            expect(body).toEqual(expect.arrayContaining(body))
            done()
        })
        .catch(err => {
            console.log(err)
            done()
        })
    })
})

describe(`GET ${baseUrl}/event`,() => {
    it('Array news', (done) => {
        request(app)
        .get('/api/event')
        .then(response => {
            const { status,body } = response
            expect(status).toBe(200)
            expect(body).toEqual(expect.arrayContaining(body))
            done()
        })
        .catch(err => {
            console.log(err)
            done()
        })
    })
})