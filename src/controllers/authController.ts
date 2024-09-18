import { loginService, registerService } from '../services/authService';
import { Context } from 'elysia';
import { AuthRequestBody } from '../types/auth';
import { successResponse, errorResponse } from '../utils/handleResponse';

export const register = async (ctx: Context) => {
	try {
		const credential = (await ctx.body) as AuthRequestBody;

		if (!credential.email || !credential.password) {
			return errorResponse(ctx, 400, 'Email and password are required'); // Bad Request
		}

		const user = await registerService(credential);

		// Exclude password field before returning
		const { password, ...userWithoutPassword } = user;

		return successResponse(
			ctx,
			201,
			'User registered successfully',
			userWithoutPassword
		); // Created
	} catch (error) {
		if (error instanceof Error) {
			return errorResponse(ctx, 500, 'Internal server error', error.message); // Internal Server Error
		}
		// Internal Server Error for unknown errors
		return errorResponse(ctx, 500, 'Unknown error occurred');
	}
};

export const login = async (ctx: Context) => {
	try {
		const credential = (await ctx.body) as AuthRequestBody;

		if (!credential.email || !credential.password) {
			return errorResponse(ctx, 400, 'Email and password are required'); // Bad Request
		}

		const token = await loginService(credential);

		return successResponse(ctx, 200, 'Login successful', { token }); // OK
	} catch (error) {
		return errorResponse(ctx, 401, 'Invalid credentials'); // Unauthorized
	}
};
