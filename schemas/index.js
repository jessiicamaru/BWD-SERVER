export const typeDefs = `#graphql
    type Query {
        users: [User]
        history(userId: String): History
        user(userId: String): User
    }

    type User {
        id: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        password: String
    }

    type History {
        userId: String,
        history: String
    }


    type Mutation {
        addUser(id: String!, firstName: String!, lastName: String!, email: String!, phone: String!, password: String!): User
        addHistory(userId: String!, history: String!): History
    }
`;
