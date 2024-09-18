import bcrypt from 'bcryptjs';
import { prisma } from '../config/prisma';

try {
	// Hash passwords using top-level await
	const password1 = await bcrypt.hash('password123', 10);
	const password2 = await bcrypt.hash('adminpassword', 10);

	// Create users
	const user1 = await prisma.user.create({
		data: { email: 'user1@example.com', password: password1 },
	});

	const user2 = await prisma.user.create({
		data: { email: 'admin@example.com', password: password2 },
	});

	// Create blog posts
	await prisma.blog.createMany({
		data: [
			{
				title: 'First Blog',
				content: 'First blog content',
				authorId: user1.id,
			},
			{
				title: 'Second Blog',
				content: 'Second blog content',
				authorId: user1.id,
			},
			{
				title: 'Admin Blog',
				content: 'Admin blog content',
				authorId: user2.id,
			},
		],
	});

	console.log('Seeding complete.');
} catch (error) {
	console.error('Error during seeding:', error);
	process.exit(1); // Exit with failure code if there is an error
} finally {
	await prisma.$disconnect(); // Ensure Prisma client is disconnected
}
