import { Elysia } from 'elysia';
import { register, login } from '../controllers/authController';

export const authRoutes = (app: Elysia) => {
	app.post('/register', register);
	app.post('/login', login);
};
