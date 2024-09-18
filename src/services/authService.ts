import { prisma } from '../config/prisma';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/generateToken';
import { AuthRequestBody } from '../types/auth';

export const registerService = async (credentials: AuthRequestBody) => {
	const { email, password } = credentials;
	const hashedPassword = await bcrypt.hash(password, 10);
	return prisma.user.create({ data: { email, password: hashedPassword } });
};

export const loginService = async (credentials: AuthRequestBody) => {
	const { email, password } = credentials;
	const user = await prisma.user.findUnique({ where: { email } });
	if (!user || !(await bcrypt.compare(password, user.password))) {
		throw new Error('Invalid credentials');
	}
	return generateToken(user.id);
};
