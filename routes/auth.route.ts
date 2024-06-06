import express, { type Request, type Response } from 'express';
import { accounts } from '../data/account.data';

const tokenPrefix = 'mock_token_';
const tokenKey = 'jwt';
let currentUser: unknown | undefined;
let token = '';

const router = express.Router();

router.post('/login', (req, res) => {
	const { username, password } = req.body;

	if (!username || !password) {
		res.status(401).json({ message: 'Missing credentials' });
		return;
	}

	const foundUser = accounts.find((a) => a.username === username);

	if (foundUser) {
		currentUser = foundUser;
		token = `${tokenPrefix}${foundUser.username}`;

		// res.set('Access-Control-Expose-Headers', 'Header_you_want_to_expose');
		res.setHeader(tokenKey, token);
		res.json(foundUser);
	} else {
		res.status(401).json({ message: 'No user found' });
	}
});

router.get('/current-user', (req, res) => {
	// const token = req.headers[tokenKey] as string;
	const token = req.headers.authorization;

	if (!token) {
		res.status(401).json({ message: 'Not Authorized' });
		return;
	}

	currentUser = getUserByToken(token);
	if (currentUser) {
		res.send(currentUser);
	} else {
		res.status(401).json({ message: `No user found with this token ${token}` });
	}
});

router.post('/logout', (req, res) => {
	currentUser = undefined;
	token = '';

	res.status(204).send();

	// For client, need clear browser localStorage/sessionStorage
});

function getUserByToken(token: string) {
	const username = token.replace(`Bearer ${tokenPrefix}`, '');
	const foundUser = accounts.find((a) => a.username === username);
	return foundUser;
}

export const authRouter = router;
