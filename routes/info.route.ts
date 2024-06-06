import express, { type Request, type Response } from 'express';

const router = express.Router();

router.get('/version', (req, res) => {
	res.json({ message: 'Product version: v1' });
});

export const infoRouter = router;
