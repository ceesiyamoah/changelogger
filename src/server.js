const express = require('express');

const app = express();

app.get('/', (req, res) => {
	res.status(200);
	res.json({
		message: 'works',
	});
});

module.exports = app;
