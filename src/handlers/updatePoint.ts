import { RequestHandler } from 'express';
import prisma from '../db';

export const getUpdatePoints: RequestHandler = async (req, res) => {
	const updatePoints = await prisma.updatePoint.findMany({
		where: {
			update: {
				product: {
					belongsToId: req.user.id,
				},
			},
		},
	});
	res.json({
		data: updatePoints,
	});
};

const createUpdatePoint: RequestHandler = async (req, res) => {
	//name,description,updateId

	const update = await prisma.update.findUnique({
		where: {
			id: req.body.updateId,
			product: {
				belongsToId: req.user.id,
			},
		},
	});

	if (!update) {
		res.json({ message: 'No update to update' });
		return;
	}

	const updatePoint = await prisma.updatePoint.create({
		data: req.body,
	});
	res.json({
		data: updatePoint,
	});
};
