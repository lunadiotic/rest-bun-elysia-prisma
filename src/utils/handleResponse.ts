import { Context } from 'elysia';

export const setResponseStatus = (ctx: Context, statusCode: number) => {
	ctx.set.status = statusCode;
};

export const successResponse = (
	ctx: Context,
	statusCode: number,
	message: string,
	data?: any
) => {
	setResponseStatus(ctx, statusCode);
	return {
		message,
		...(data ? { data } : {}), // Include data only if provided
	};
};

export const errorResponse = (
	ctx: Context,
	statusCode: number,
	message: string,
	error?: string
) => {
	setResponseStatus(ctx, statusCode);
	return {
		message,
		...(error ? { error } : {}), // Include error message only if provided
	};
};
