const { Schema, model } = require('mongoose')

const DriverSchema = Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required']
  },
  driving: {
    type: Boolean,
    default: false,
    required: [true]
  }
})

module.exports = model('Driver', DriverSchema)
