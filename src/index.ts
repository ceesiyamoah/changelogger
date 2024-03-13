import { User } from '@prisma/client';
import app from './server';
import * as dotenv from 'dotenv';
import config from './config';
dotenv.config();

declare module 'express-serve-static-core' {
	interface Request {
		user?: Partial<User>;
	}
}

app.listen(config.port, () => {
	console.log('Running on http://localhost:' + 3000);
});
