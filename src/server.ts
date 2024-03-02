import express, { NextFunction, RequestHandler } from 'express';
import router from './router';
import morgan from 'morgan';
import cors from 'cors';
import { authenticated } from './modules/auth';
import { createNewUser, signin } from './handlers/user';
import { check } from 'express-validator';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', authenticated, router);
app.post('/user', check('username').exists().isString(), check('password').exists().isString(), createNewUser);
app.post('/signin', signin);

app.use((err, req, res, next) => {
	let status = 400;
	let message = 'unauthorized';
	switch (err.type) {
		case 'auth':
			status = 401;
			break;
		case 'input':
			message = 'invalid input';
		default:
			status = 500;
			message = 'server error';
			break;
	}
	res.status(status).json(message);
});

export default app;
