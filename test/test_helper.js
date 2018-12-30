const mongoose = require('mongoose')

before(done => {
  mongoose.connect('mongodb://localhost/ride_share_test')
  mongoose.connection
    .once('open', () => done())
    .on('error', error => {
      console.warn('Warning', error)
    })
})

beforeEach(done => {
  const { drivers } = mongoose.connection.collections
  drivers
    .drop()
    .then(() => drivers.ensureIndex({ 'geometry.coordinates': '2dsphere' }))
    .then(() => done())
    .catch(error => done(error))
  console.log(mongoose.connection.collections)
})
