const Post =require("./models/post.js");
const Editor= require("./models/editor.js");
let requireLogin = async (context) => {
    let email = context.email;
    let password = context.password;
    const res = await Editor.login(email, password);
    if(res){
        const editor = await Editor.findByEmail(email);
        console.log(editor);
        if (editor.id) {
            context.editor_id = editor.id;
            return true;  
        }
    }
    // context.editor_id=null;
    return false;
};

const resolvers = {
    Query: {
        posts:() => {
            return Post.allPosts();
        },  
        post(_,args){
            return Post.postsById(args.id);
        },
        postByEditor(_,args){
            return Post.postsByEditorId(args.id);
        }
        ,
        editors(){
            return Editor.findALL();
        },
        editor(_,args){
            return Editor.findById(args.id);
        }
    },
    Post:{
        editor(parent){
            return Editor.editorOf(parent.id);
        }
    },
    Editor:{
        posts(parent){
            return Post.postsByEditorId(parent.id);
        }
    },
    Mutation:{
        addPost:async(_,args,context)=>{
            const res = await requireLogin(context);
            console.log(context)
            console.log(context.editor_id)
            if(res){
                args.post.editor_id = context.editor_id;
                return Post.createPost(args.post);
            }
            return null
        },
        editPost: async (_, args, context) => {
            
            const res = await requireLogin(context);
            if (res) 
                return Post.updatePost(args.id, args.edited_post);
            return null;
            },

        deletePost:async(_,args,context)=>{
            const res = await requireLogin(context);
            if (res) 
                return Post.deletePostById(args.id);
            return null;
        },
        addEditor:async(_,args,context)=>{
            
            const res = await requireLogin(context);
            if (res) 
                return Editor.createEditor(args.editor);
            return null;

        },editEditor:async(_,args,context)=>{
            const res = await requireLogin(context);
            if (res) 
                return Editor.updateEditor(args.id,args.editor)
            return null;

        },deleteEditor:async(_,args,context)=>{
            const res = await requireLogin(context.email, context.password);
            console.log(context.editor_id)
            if (res && (args.id !== context.editor_id)) 
                return Editor.deleteById(args.id)
            return null;
        },
    }
};
module.exports =resolvers