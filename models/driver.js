const mongoose = require('mongoose')

const PointSchema = mongoose.Schema({
  type: { type: String, default: 'Point' },
  coordinates: { type: [Number], index: '2dsphere', required: true }
})

const DriverSchema = mongoose.Schema({
  email: { type: String, required: [true, 'Email is required'] },
  driving: { type: Boolean, default: false, required: [true] },
  geometry: PointSchema
})

module.exports = mongoose.model('drivers', DriverSchema)
