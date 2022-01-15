const { Users } = require("../models")

const resolvers = {
    Query: {
        users: () => {
            return Users.findAll();
        },
    },
    Mutation: {
        createUser: async (_, args) => {
            const { name, username, password } = args.input
            const addUser = await Users.create({ name, username, password })
            return addUser;
        },
    }
}
module.exports = { resolvers }