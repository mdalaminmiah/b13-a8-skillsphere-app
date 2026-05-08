// src/lib/auth.js  — db.js MUST be the first import
import './db.js'; // ← line 1, no other imports before this
import { betterAuth } from 'better-auth';
import { MongoClient } from 'mongodb';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';

const client = new MongoClient(process.env.MONGO_URI, {
    family: 4,
    connectTimeoutMS: 30000,
    socketTimeoutMS: 30000,
    serverApi: { version: '1', strict: true, deprecationErrors: true },
});

const db = client.db('skillsphereDB');

export const auth = betterAuth({
    database: mongodbAdapter(db, { client }),
    emailAndPassword: { enabled: true },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
        github: {
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        },
    },
});
