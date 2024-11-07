const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const typeDefs  = require('./schema.js');
const resolvers  = require('./resolvers.js');
const context  = require('./context.js');
// console.log(context);

async function startServer() {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
        context : ({ req }) => {
            const email = req.headers['email'];
            const password = req.headers['password'];
            return { email , password};
        }
        
    });
    console.log(`Server running at ${url}`);
}

startServer();
// const Editor = require('./models/editor.js');
// Editor.login('hany','hany').then(res=>res?console.log("dsdsds"):console.log("sad"));