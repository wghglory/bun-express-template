import express, { type Request, type Response } from 'express';
import { users } from '../data/user.data';

const router = express.Router();

router.get('/', (req, res) => {
	res.json(users);
});

router.post('/', (req, res) => {
	const body = req.body;
	res.json({ message: 'Create user', ...body });
});

router.delete('/', (req, res) => {
	res.json({ message: 'Delete user' });
});

export const userRouter = router;
