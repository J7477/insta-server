var express = require('express');
const db = require('./models')

const { ApolloServer } = require('apollo-server')
const { typeDefs } = require('./Schema/typedefs')
const { resolvers } = require('./Schema/resolvers')
const server = new ApolloServer({ typeDefs, resolvers })


var app = express();
app.use(express.json())

db.sequelize.sync().then(() => {
    server.listen().then(({ url }) => {
        console.log(`Running a GraphQL API server at ${url}`)
    })
})