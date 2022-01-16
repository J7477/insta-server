var express = require('express');
const db = require('./models')

const { ApolloServer } = require('apollo-server')
const { typeDefs } = require('./Schema/typedefs')
const { resolvers } = require('./Schema/resolvers')
const server = new ApolloServer({ typeDefs, resolvers })
const cors = require('cors')
// const isAuth = require('./middleware/Auth')

var app = express();
app.use(express.json())
app.use(cors())
// app.use(isAuth)

db.sequelize.sync().then(() => {
    server.listen().then(({ url }) => {
        console.log(`Running a GraphQL API server at ${url}`)
    })
})