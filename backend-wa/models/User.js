const pool = require('../config/db');

class User {
    static async create({ username, password, display_name, phone_number, email }) {
        const result = await pool.query(
            'INSERT INTO users (username, password, display_name, phone_number, email) VALUES ($1, $2, $3, $4, $5)',
            [username, password, display_name, phone_number, email]
        );
        return result.rows[0];
    }

    static async findAll() {
        const result = await pool.query('SELECT * FROM users');
        return result.rows;
    }

    static async findByUsername(username) {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        return result.rows[0];
    }

    static async updateUsername(currentUsername, newUsername) {
        const result = await pool.query(
            'UPDATE users SET username = $1 WHERE username = $2 RETURNING *',
            [newUsername, currentUsername]
        );
        return result.rows[0];
    }

    static async updateDisplayName(username, display_name) {
        const result = await pool.query(
            'UPDATE users SET display_name = $1 WHERE username = $2 RETURNING *',
            [display_name, username]
        );
        return result.rows[0];
    }

    static async updateEmail(username, email) {
        const result = await pool.query(
            'UPDATE users SET email = $1 WHERE username = $2 RETURNING *',
            [email, username]
        );
        return result.rows[0];
    }

    static async updatePhoneNumber(username, phone_number) {
        const result = await pool.query(
            'UPDATE users SET phone_number = $1 WHERE username = $2 RETURNING *',
            [phone_number, username]
        );
        return result.rows[0];
    }

    static async delete(id) {
        const result = await pool.query('DELETE FROM users WHERE user_id = $1 RETURNING *', [id]);
        return result.rows[0];
    }
}

module.exports = User;
