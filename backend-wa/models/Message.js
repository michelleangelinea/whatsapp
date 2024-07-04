const pool = require('../config/db');

class Message {
    static async create({ chat_id, sender_id, content }) {
        const result = await pool.query(
            'INSERT INTO messages (chat_id, sender_id, content) VALUES ($1, $2, $3) RETURNING *',
            [chat_id, sender_id, content]
        );
        return result.rows[0];
    }

    static async findAll() {
        const result = await pool.query('SELECT * FROM messages');
        return result.rows;
    }

    static async findById(id) {
        const result = await pool.query('SELECT * FROM messages WHERE message_id = $1', [id]);
        return result.rows[0];
    }

    static async update(id, { content }) {
        const result = await pool.query(
            'UPDATE messages SET content = $1 WHERE message_id = $2 RETURNING *',
            [content, id]
        );
        return result.rows[0];
    }

    static async delete(id) {
        const result = await pool.query('DELETE FROM messages WHERE message_id = $1 RETURNING *', [id]);
        return result.rows[0];
    }
}

module.exports = Message;
