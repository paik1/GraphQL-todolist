const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const cors = require('cors');
const dotEnv = require('dotenv');


const resolvers = require('./resolvers');
const typeDefs = require('./typeDefs');

const {tasks, users} = require('./constants/index');
const { connection } = require('./database/util');
const { verifyUser } = require('./helper/context');


// set env variables
dotEnv.config();

const app = express();

// db connectivity
connection();

//cors
app.use(cors());

// body parser middleware
app.use(express.json());

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({req}) => {
    verifyUser(req)
    return{
      email:"test@gmail.com"
    }
  }
});

apolloServer.applyMiddleware({ app, path: '/graphql' });

const PORT = process.env.PORT || 3000;

app.use('/', (req, res, next) => {
  res.send({ message: 'Hello' });
})

app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
  console.log(`Graphql Endpoint: ${apolloServer.graphqlPath}`);
});