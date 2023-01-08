import { ApolloServer, gql } from "apollo-server";

import { v4 as uuidv4 } from 'uuid';

const typeDefs = gql`
    type User {
        id: String!
        name: String!
    }

    type Query {
        users: [User!]!
    }

    type Mutation {
        createUser(name: String!): User!
    }
`;
interface User {
  id: string;
  name: string;
}

const users: User[] = [];

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      users: () => {
        return users;
      },
    },

    Mutation: {
      createUser: (_, args) => {
        const user = {
            id: uuidv4(),
            name: args.name
        }

        users.push(user);

        return user;
      },
    },
  },
});

server.listen().then(({ url }) => {
  console.log("Servidor rodando na URL: " + url);
});
