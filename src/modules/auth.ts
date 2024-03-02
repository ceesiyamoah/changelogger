import { User } from '@prisma/client';
import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const comparePasswords = (password: string, hash: string) => bcrypt.compare(password, hash);

export const hashPassword = (password: string) => bcrypt.hash(password, 5);

export const createJWT = ({ id, username }: User) => {
	const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '24h' });
	return token;
};

export const authenticated: RequestHandler = (req, res, next) => {
	const bearer = req.headers.authorization;
	if (!bearer) {
		res.status(401);
		res.json({
			message: 'Not authorization',
		});
		return;
	}

	const [, token] = bearer.split(' ');
	if (!token) {
		res.status(401);
		res.json({
			message: 'Invalid token',
		});
		return;
	}

	try {
		const user = jwt.verify(token, process.env.JWT_SECRET) as User;
		req.user = user;
		next();
	} catch (error) {
		console.error(error);
		res.status(401);
		res.json({
			message: 'Invalid token',
		});
		return;
	}
};
