'use strict';

/**
 * In-memory User model placeholder.
 *
 * Replace this with your real ORM/ODM model.
 * The interface (findByEmail, findById, create) is used by
 * the auth and user controllers.
 */

const users = []; // In-memory store – NOT for production use.
let _nextId = 1; // Monotonic counter – stays unique even after deletions.

const UserModel = {
  /**
   * Find a user by email address.
   * @param {string} email
   * @returns {object|undefined}
   */
  findByEmail(email) {
    return users.find((u) => u.email === email);
  },

  /**
   * Find a user by id.
   * @param {number|string} id
   * @returns {object|undefined}
   */
  findById(id) {
    return users.find((u) => u.id === id);
  },

  /**
   * Create and persist a new user.
   * @param {{name: string, email: string, passwordHash: string}} data
   * @returns {object} The created user (without passwordHash).
   */
  create({ name, email, passwordHash }) {
    const user = {
      id: _nextId++,
      name,
      email,
      passwordHash,
      createdAt: new Date().toISOString(),
    };
    users.push(user);
    const { passwordHash: _omit, ...publicUser } = user;
    return publicUser;
  },

  /**
   * Return all users (public fields only).
   * @returns {Array}
   */
  findAll() {
    return users.map(({ passwordHash: _omit, ...u }) => u);
  },
};

module.exports = UserModel;
