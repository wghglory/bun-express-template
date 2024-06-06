import express, {
	type NextFunction,
	type Request,
	type Response,
} from 'express';

export const delayMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	setTimeout(next, 500);
};
