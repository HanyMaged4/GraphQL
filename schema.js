const typeDefs = `#graphql
    type Editor {
        id: ID!
        name: String!
        email: String!
        password: String!
        posts: [Post]
    }

    type Post {
        id: ID!
        title: String!
        content: String!
        createdat: String!
        editor: Editor
    }

    type Query {
        posts: [Post]
        post(id: ID!): Post
        postByEditor(id: ID!): [Post!]
        editors: [Editor!]
        editor(id: ID!): Editor
    }

    type Mutation {
        addPost(post: PostInput!): Post
        editPost(id: ID!, edited_post: PostInput!): Post
        deletePost(id: ID!): Boolean

        addEditor(editor: EditorInput!): Editor
        editEditor(id: ID!, editor: EditorInput!): Editor
        deleteEditor(id: ID!): Boolean
    }

    input PostInput {
        title: String
        content: String
    }

    input EditorInput {
        name: String
        email: String
        password: String
    }
`
module.exports = typeDefs;