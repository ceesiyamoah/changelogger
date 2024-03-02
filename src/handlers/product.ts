import { RequestHandler } from 'express';
import prisma from '../db';

//GET All products
export const getProducts: RequestHandler = async (req, res) => {
	const user = await prisma.user.findFirst({
		where: {
			id: req.user.id,
		},
		include: {
			products: true,
		},
	});

	res.json({
		data: user.products,
	});
};

//GET one product
export const getOneProduct: RequestHandler = async (req, res) => {
	const product = await prisma.product.findUnique({
		where: {
			belongsToId: req.user.id,
			id: req.params.id,
		},
	});

	res.json({
		data: product,
	});
};

// POST product
export const createProduct: RequestHandler = async (req, res) => {
	const product = await prisma.product.create({
		data: {
			name: req.body.name,
			belongsToId: req.user.id,
		},
	});

	res.status(201);
	res.json({
		data: product,
	});
};

//PUT product
export const updateProduct: RequestHandler = async (req, res, next) => {
	const product = await prisma.product.update({
		where: {
			belongsToId: req.user.id,
			id: req.params.id,
		},
		data: {
			name: req.body.name,
		},
	});

	res.json({
		data: product,
	});
};

export const deleteProduct: RequestHandler = async (req, res) => {
	const deleted = await prisma.product.delete({
		where: {
			belongsToId: req.user.id,
			id: req.params.id,
		},
	});

	res.json({
		data: deleted,
	});
};
