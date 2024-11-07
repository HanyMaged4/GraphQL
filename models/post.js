const db = require("../db_config/db.js");
const Editor =require("../models/editor.js");
class Post {
    constructor({ id, title, content, createdat, editor_id }){
        this.id = id;
        this.title = title;
        this.content = content;
        this.createdat = createdat;
        this.editor = editor_id;
    }
    static async createPost(post) {
        post.createdat= new Date().toISOString()
        const res = await db.query(
            `INSERT INTO post (title, content, createdat, editor_id) 
            VALUES ($1, $2, $3, $4) RETURNING *`,
            [post.title, post.content, post.createdat, post.editor_id]
        );
        let ress= new Post(res.rows[0]);
        console.log(ress);
        return ress;
    }

    static async allPosts() {
        const res = await db.query('SELECT * FROM post');
        let ress = res.rows.map(r => new Post(r));
        return ress;
    }

    static async postsById(id) {
        const res = await db.query(`SELECT * FROM post WHERE id = $1`, [id]);
        let ress = res.rows[0];
        console.log(ress);
        
        return ress;
    }

    static async postsByEditorId(editor) {
        const res = await db.query(`SELECT * FROM post WHERE editor_id = $1`, [editor]);
        return res.rows.map(row => new Post(row));
    }

    static async updatePost(id, { title, content }) {
        let post =await this.postsById(id);
        if(title)
            post.title = title;
        if(content)
            post.content = content;
        const res = await db.query(
            `UPDATE post
            SET title = $1,
                content = $2
            WHERE id = $3
            RETURNING *`,
            [post.title, post.content, id]
        );
        return new Post(res.rows[0]);
    }

    static async deletePostById(id) {
        await db.query(`DELETE FROM post WHERE id = $1`, [id]);
        return true;
    }
}
module.exports = Post;