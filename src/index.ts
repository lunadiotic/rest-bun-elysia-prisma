import { Elysia } from 'elysia';
import { authRoutes } from './routes/authRoutes';

const app = new Elysia();

authRoutes(app);

app.listen(3000, () => {
	console.log('Server is running on port 3000');
});
