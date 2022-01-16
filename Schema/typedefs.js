const { gql } = require('apollo-server')

const typeDefs = gql`
    type User{
    id:ID!
   name:String!, 
   username:String!,
   password:String,
    }

    type AuthData{
    userId:ID!,
    token:String!
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

    input loginInput{
        email:String!,
        password:String!
    }

    type Mutation{
    createUser(input:createUserInput!):User
    login(input:loginInput!):AuthData!
    }

`
module.exports = { typeDefs }
