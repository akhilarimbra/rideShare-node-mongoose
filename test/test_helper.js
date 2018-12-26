const mongoose = require('mongoose')

before(done => {
  mongoose.connect('mongodb://localhost/ride_share_test')
  mongoose.connection
    .once('open', () => done())
    .on('error', error => {
      console.warn('Warning', error)
    })
})

// beforeEach(done => {
//   const { drivers } = mongoose.connection.collection
//   drivers
//     .drop()
//     .then(() => done())
//     .catch(error => done(error))
//   console.log(mongoose.connection.collections)
// })
