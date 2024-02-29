import { RequestHandler } from 'express';
import prisma from '../db';
import { User } from '@prisma/client';
import { comparePasswords, createJWT, hashPassword } from '../modules/auth';

export const createNewUser: RequestHandler = async (req, res) => {
	const { username, password } = req.body as Omit<User, 'id' | 'createdAt'>;
	const user = await prisma.user.create({
		data: {
			username,
			password: await hashPassword(password),
		},
	});

	const token = createJWT(user);
	res.json({ token });
};

export const signin: RequestHandler = async (req, res) => {
	const { username, password } = req.body as Omit<User, 'id' | 'createdAt'>;
	const user = await prisma.user.findUnique({
		where: {
			username,
		},
	});

	const passwordIsValid = comparePasswords(password, user.password);
	if (!passwordIsValid) {
		res.status(401);
		res.json({
			message: 'Invalid username and/or password',
		});
		return;
	}

	const token = createJWT(user);
	const userDetails = { ...user };
	delete userDetails.password;
	res.json({
		user: userDetails,
		token,
	});
};
