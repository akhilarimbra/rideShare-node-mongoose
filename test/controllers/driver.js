const assert = require('assert')
const request = require('supertest')
const mongoose = require('mongoose')

const app = require('../../app')
const Driver = mongoose.model('drivers')

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
                assert(driver != null)
                done()
              })
              .catch(error => done(error))
          })
      })
      .catch(error => done(error))
  })

  it('Get to /api/drivers can find nearby drivers', done => {
    const seattleDriver = Driver({
      email: 'seattle@test.com',
      geometry: { type: 'Point', coordinates: [-122.4759902, 47.6147628] }
    })

    const miamiDriver = Driver({
      email: 'miami@test.com',
      geometry: { type: 'Point', coordinates: [-80.253, 25.791] }
    })

    Promise.all([seattleDriver.save(), miamiDriver.save()])
      .then(result => {
        request(app)
          .get('/api/drivers?lat=25&lng=-80')
          .end((error, response) => {
            console.log(response.body)
            done()
          })
      })
      .catch(error => {
        request(app)
          .get('/api/drivers?lat=25&lng=-80')
          .end((error, response) => {
            assert(response.body.length === 1)
            assert(response.body[0].obj.email === 'miami@test.com')
            done()
          })
      })
  })
})
