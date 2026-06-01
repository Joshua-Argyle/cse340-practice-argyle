import bcrypt from 'bcrypt';
import db from '../db.js';

/**
 * Find a user by email address for login verification.
 * 
 * @param {string} email - Email address to search for
 * @returns {Promise<Object|null>} User object with password hash or null if not found
 */
const findUserByEmail = async (email) => {
    // TODO: Write SELECT query for id, name, email, password, created_at
    const query = `
        SELECT id, name, email, password, created_at
        FROM users
        WHERE LOWER(email) = LOWER($1)
        LIMIT 1
    `;
    const result = await db.query(query, [email]);
    return result.rows[0] || null;
};

/**
 * Verify a plain text password against a stored bcrypt hash.
 * 
 * @param {string} plainPassword - The password to verify
 * @param {string} hashedPassword - The stored password hash
 * @returns {Promise<boolean>} True if password matches, false otherwise
 */
const verifyPassword = async (plainPassword, hashedPassword) => {
    // TODO: Use bcrypt.compare() to verify the password
    return await bcrypt.compare(plainPassword, hashedPassword);
    // TODO: Return the result (true/false)
    return result;
};

export { findUserByEmail, verifyPassword };