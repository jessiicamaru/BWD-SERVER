import express, { query } from 'express';
import http from 'http';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import bodyParser from 'body-parser';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';

import mongoose from 'mongoose';
import { typeDefs } from './schemas/index.js';
import { resolvers } from './resolvers/index.js';

import 'dotenv/config';

const app = express();
const httpServer = http.createServer(app);

const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@bwd.h9myjdu.mongodb.net/?retryWrites=true&w=majority&appName=bwd`;
const PORT = process.env.PORT || 4000;

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(cors(), bodyParser.json(), expressMiddleware(server));

mongoose.set('strictQuery', false);
mongoose.connect(URI).then(async () => {
    console.log('Connected to MongoDB');

    await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
    console.log('server ready in port 4000');
});

/*
fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Aceept': 'application/json',
    },
    body: JSON.stringify({query: "{users {id, firstName, lastName, email, phone}}"})
})
    .then(res => res.json())
    .then(data => console.log('data returned', data))
*/

/**
 * 
 * query User($userId: String) {
  user(userId: $userId) {
    email
    id
    firstName
    lastName
    password
    phone
  }
}
 */
