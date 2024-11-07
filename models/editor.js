const db = require("../db_config/db.js");
const { ApolloError } = require('apollo-server-errors');
class Editor {
    constructor({ id, name, email, password }) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }
    static async login(email,password){
        try {
            const res = await db.query(
              `SELECT id, name, email, password FROM editor WHERE email = $1 AND password = $2`,
              [email, password]
            );
            if (res.rows.length === 0) 
                return 0;
            return 1;
            } catch (error) {
            console.error("Database query error:", error);
            return 0;
        }
    }
    static async findALL() {
        const res = await db.query("SELECT * FROM editor");
        return res.rows.map(row => new Editor(row));
    }

    static async findById(id) {
        const res = await db.query(`SELECT * FROM editor WHERE id = $1`, [id]);
        let ress =  new Editor(res.rows[0]);
        return ress;
    }
    static async findByEmail(email) {
        const res = await db.query(`SELECT * FROM editor WHERE email = $1`, [email]);
        let ress =  new Editor(res.rows[0]);
        return ress;
    }
    
    static async updateEditor(id, { name, email, password }) {
        let editor = await this.findById(id);

        if (name) editor.name = name;
        if (email) editor.email = email;
        if (password) editor.password = password;
            console.log(editor);
        const res = await db.query(
            `UPDATE editor
            SET name = $1,
                email = $2,
                password = $3
            WHERE id = $4
            RETURNING *`,
            [editor.name, editor.email, editor.password, id]
        );
        console.log(res.rows[0])
        return new Editor(res.rows[0]);
    }

    static async createEditor({ name, email, password }) {
        const insert = await db.query(
            `INSERT INTO editor (name, email, password)
            VALUES ($1, $2, $3) RETURNING *`,
            [name, email, password]
        );
        return new Editor(insert.rows[0]);
    }

    static async deleteById(id) {
        await db.query(`DELETE FROM editor WHERE id = $1`, [id]);
        return true;
    }

    static async editorOf(id) {
        const res = await db.query(`SELECT editor_id FROM post WHERE id = $1`, [id]);
        const editorId = res.rows[0].editor_id;
        const editor = await Editor.findById(editorId); 
        return editor
}
}

module.exports = Editor;