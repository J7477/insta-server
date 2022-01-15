const { gql } = require('apollo-server')

const typeDefs = gql`
    type User{
    id:ID!
   name:String!, 
   username:String!,
   password:String!,
   friends:[User!]
    }

       
    type Query{
        users:[User!]!
        user(id:ID!):User!
    }

    input createUserInput{
        name:String!, 
   username:String!,
   password:String!
    }


    type Mutation{
    createUser(input:createUserInput!):User!
    }

`
module.exports = { typeDefs }
