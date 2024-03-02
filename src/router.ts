import { RequestHandler, Router } from 'express';
import { body, validationResult, check, checkSchema, oneOf } from 'express-validator';
import { handleInputError } from './modules/middleware';
import { createProduct, getOneProduct, getProducts, updateProduct } from './handlers/product';
import { createUpdate, deleteUpdate, getAllUpdates, getOneUpdate, updateUpdate } from './handlers/update';

const router = Router();

const productValidators = () => [check('name').notEmpty().isString().withMessage('Enter a name').escape()];

/**
 * Product routes
 *  */
router.get('/product', handleInputError, getProducts);
router.get('/product/:id', getOneProduct);
router.put('/product/:id', ...productValidators(), handleInputError, updateProduct);
router.post('/product', ...productValidators(), handleInputError, createProduct);

/**
 * Update routes
 *  */
router.get('/updates', getAllUpdates);
router.get('/update/:id', getOneUpdate);
router.put(
	'/update/:id',
	checkSchema({
		status: { isIn: { options: ['IN_PROGRESS', 'SHIPPED', 'DEPRECATED'] }, optional: true },
		title: { optional: true, isString: true },
		version: { optional: true },
		body: {
			optional: true,
			isString: true,
		},
	}),
	handleInputError,
	updateUpdate
);
router.post(
	'/update',
	checkSchema({
		title: { exists: true, isString: true },
		body: { exists: true, isString: true },
		productId: {
			exists: true,
			isString: true,
		},
	}),
	handleInputError,
	createUpdate
);
router.delete('/update/:id', deleteUpdate);

/**
 * Update point routes
 *  */
router.get('/updatepoint', () => {});
router.get('/updatepoint/:id', () => {});
router.put(
	'/updatepoint/:id',
	check('name').optional().isString(),
	check('description').optional().isString(),
	handleInputError,
	() => {}
);
router.post(
	'/updatepoint',
	check('name').notEmpty().isString().isLength({ max: 255 }),
	check('description').notEmpty().isString(),
	check('updateId').exists().isString(),
	handleInputError,
	() => {}
);
router.delete('/updatepoint/:id', () => {});

export default router;
