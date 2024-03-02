import { RequestHandler } from 'express';
import prisma from '../db';
import { Update } from '@prisma/client';

export const getAllUpdates: RequestHandler = async (req, res) => {
	const updates = await prisma.update.findMany({
		where: {
			product: {
				belongsToId: req.user.id,
			},
		},
	});

	res.json({
		data: updates,
	});
};

export const getOneUpdate: RequestHandler = async (req, res) => {
	const update = await prisma.update.findUnique({
		where: {
			id: req.params.id,
		},
	});

	res.json({
		data: update,
	});
};

export const createUpdate: RequestHandler = async (req, res) => {
	//title,body,productId

	const product = await prisma.product.findUnique({
		where: {
			id: req.body.productId,
			belongsToId: req.user.id,
		},
	});
	console.log(product);
	if (!product) {
		//handle error
		res.json({
			message: 'No product to update',
		});
	}

	const update = await prisma.update.create({
		data: {
			...req.body,
			product: {
				connect: {
					id: product.id,
				},
			},
		},
	});

	res.json({
		data: update,
	});
};

export const updateUpdate: RequestHandler = async (req, res) => {
	const update = await prisma.update.update({
		data: req.body,

		where: {
			id: req.body.id,
			product: {
				belongsToId: req.user.id,
			},
		},
	});

	res.json({
		message: update,
	});
};

export const deleteUpdate: RequestHandler = async (req, res) => {
	const deleted = await prisma.update.delete({
		where: {
			id: req.body.id,
			product: {
				belongsToId: req.user.id,
			},
		},
	});

	res.json({
		message: 'Deleted successfully',
	});
};
