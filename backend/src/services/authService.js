const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const SALT_ROUNDS = 10;

/**
 * Register a new user.
 * Expects an object with { email, password, roleId }.
 */
async function register({ email, password, roleId }) {
    // Check if user already exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
        throw new Error('User already exists');
    }

    const hashed = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await prisma.user.create({
        data: { email, password: hashed, roleId },
        select: { id: true, email: true },
    });
    return user;
}

/**
 * Login a user and return a JWT.
 * Expects an object with { email, password }.
 */
async function login({ email, password }) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        throw new Error('Invalid credentials');
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
        throw new Error('Invalid credentials');
    }
    const token = jwt.sign({ sub: user.id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
    return token;
}

module.exports = { register, login };
