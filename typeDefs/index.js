const userTypeDefs = require('./user');
const taskTypeDefs = require('./task');
const { gql } = require('apollo-server-core');


const typeDefs = gql`
    scalar Date
    
    type Query{
        _:String
    }
    type Mutation{
        _:String
    }
`;

module.exports = [
    typeDefs,
    userTypeDefs,
    taskTypeDefs
]