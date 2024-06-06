import express, {
	type NextFunction,
	type Request,
	type Response,
} from 'express';

const publicAPIRoutes = ['/api/v1/core/login'];

// Middleware to validate Authorization header
export const authMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	// pass by API routes
	if (publicAPIRoutes.includes(req.path)) {
		next();
	} else {
		const token = req.headers.authorization;
		if (token) {
			next();
		} else {
			res.status(401).json({ message: 'No valid authorization token' });
		}
	}
};
