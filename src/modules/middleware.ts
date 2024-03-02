import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';

export const handleInputError: RequestHandler = (req, res, next) => {
	console.log('hreree');
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(400);
		res.json({ errors: errors.array() });
		return;
	}
	next();
};
