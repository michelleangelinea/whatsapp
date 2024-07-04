const pool = require('../config/db');

class Chat {
    static async create({ sender_id, receiver_id }) {
        const result = await pool.query(
            'INSERT INTO chats (sender_id, receiver_id) VALUES ($1, $2) RETURNING *',
            [sender_id, receiver_id]
        );
        return result.rows[0];
    }

    static async findAll() {
        const result = await pool.query('SELECT * FROM chats');
        return result.rows;
    }

    static async findById(id) {
        const result = await pool.query('SELECT * FROM chats WHERE chat_id = $1', [id]);
        return result.rows[0];
    }

    static async update(id, { sender_id, receiver_id }) {
        const result = await pool.query(
            'UPDATE chats SET sender_id = $1, receiver_id = $2 WHERE chat_id = $3 RETURNING *',
            [sender_id, receiver_id, id]
        );
        return result.rows[0];
    }

    static async delete(id) {
        const result = await pool.query('DELETE FROM chats WHERE chat_id = $1 RETURNING *', [id]);
        return result.rows[0];
    }
}

module.exports = Chat;
