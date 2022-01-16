const { Users } = require("../models")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const resolvers = {
    Query: {
        users: () => {
            return Users.findAll();
        },
    },
    Mutation: {
        createUser: async (_, args) => {

            const { name, username, password } = args.input
            try {
                const existingUser = await Users.findOne({ where: { username } })
                if (existingUser) {
                    throw new Error('User already exists');
                }

                return bcrypt
                    .hash(password, 12)
                    .then((hashedPassword) => {
                        const addUser = new Users({
                            name,
                            username,
                            password: hashedPassword
                        })
                        return addUser.save()
                    })
                    .then((result) => {
                        return result
                    })
                    .catch((err) => {
                        throw err
                    });

            } catch {
                (err) => {
                    throw (err)
                }
            }
        },
        login: async (_, args) => {

            const { email, password } = args.input

            const user = await Users.findOne({ email });
            if (!user) {
                throw new Error('User does not exist')
            }


            const isEqual = await bcrypt.compare(password, user.password)
            if (!isEqual) {
                throw new Error('Incorrect Credentials')
            }
            const token = await jwt.sign({ userId: user.id, email: user.email }, 'SECRETTOKEN')
            return { userId: user.id, token }
        }
    }
}
module.exports = { resolvers }