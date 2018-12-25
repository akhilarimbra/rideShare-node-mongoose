const express = require('express')

const app = express()

app.get('/api', (req, res) => {
	return res.json({ message: 'hello' })
})

module.exports = app

