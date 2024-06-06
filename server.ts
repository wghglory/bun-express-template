import bodyParser from 'body-parser';
import express from 'express';
import { authMiddleware } from './middlewares/auth.middleware';
import { delayMiddleware } from './middlewares/delay.middleware';
import { timeoutMiddleware } from './middlewares/timeout.middleware';
import { authRouter, infoRouter, userRouter } from './routes';

const app = express();
const port = 3000;
const apiPrefix = '/api/v1';

// Middlewares
app.use(authMiddleware, delayMiddleware, timeoutMiddleware);
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	next();
});

// Routes
const apiRouter = express.Router();
app.use(apiPrefix, apiRouter);

// Routes for different features
apiRouter.use('/core', [authRouter, infoRouter]);

apiRouter.use('/users', userRouter);

app.listen(port, () => {
	console.log(`Listening on port ${port}...`);
});
