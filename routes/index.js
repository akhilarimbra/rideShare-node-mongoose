const DriverController = require('../controllers/driver')

module.exports = app => {
  app.get('/api', DriverController.greeting)
  app.post('/api/driver', DriverController.create)
  app.put('/api/driver/:id', DriverController.edit)
  app.delete('/api/driver/:id', DriverController.delete)

  app.get('/api/drivers', DriverController.index)
}
