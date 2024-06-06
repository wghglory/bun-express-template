import express, {
	type NextFunction,
	type Request,
	type Response,
} from 'express';

// Middleware to set a timeout for API responses
export const timeoutMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const timeout = setTimeout(() => {
		res.status(503).json({ message: 'Request Timeout' });
	}, 3000);

	res.on('finish', () => {
		clearTimeout(timeout);
	});

	next();
};
