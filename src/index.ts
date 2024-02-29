import { User } from '@prisma/client';
import app from './server';
import * as dotenv from 'dotenv';
dotenv.config();

declare module 'express-serve-static-core' {
	interface Request {
		user?: Partial<User>;
	}
}

app.listen(3000, () => {
	console.log('Running on http://localhost:' + 3000);
});
