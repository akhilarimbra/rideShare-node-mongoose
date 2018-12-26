const assert = require('assert')
const request = require('supertest')
const { model } = require('mongoose')

const app = require('../../app')
const Driver = model('Driver')

describe('driver controller', () => {
  it('Post to /api/drivers creates a new driver', done => {
    Driver.count().then(count => {
      request(app)
        .post('/api/driver')
        .send({ email: 'test@test.com' })
        .end((error, response) => {
          if (error) console.log(error)
          done()
        })
    })
  })

  xit('Put to /api/driver/id edits an existing driver', done => {
    const driver = Driver({ email: 'nilamburakhil@gmail.com', driving: false })
    driver
      .save()
      .then(() => {
        request(app)
          .put(`/api/driver/${driver.id}`)
          .send({ driving: true })
          .end((error, response) => {
            Driver.findOne({ email: 'nilamburakhil@gmail.com' })
              .then(driver => {
                assert(driver.driving === true)
                done()
              })
              .catch(error => done(error))
          })
      })
      .catch(error => done(error))
  })

  it('Delete to /api/driver/id can delete a driver', done => {
    const driver = Driver({ email: 'deletable@gmail.com', driving: false })
    driver
      .save()
      .then(() => {
        request(app)
          .delete(`/api/driver/${driver.id}`)
          .end((error, response) => {
            Driver.findOne({ email: 'deletable@gmail.com' })
              .then(driver => {
                assert(driver === null)
                done()
              })
              .catch(error => done(error))
          })
      })
      .catch(error => done(error))
  })
})
