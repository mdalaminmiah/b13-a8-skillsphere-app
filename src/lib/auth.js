// src/lib/auth.js — db.js MUST be the first import (sets up DNS before Mongo).
import './db.js';
import { betterAuth } from 'better-auth';
import { MongoClient } from 'mongodb';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';

const uri = process.env.MONGO_URI;

if (!uri) {
    // Fail loudly at startup instead of hanging on every auth request.
    console.error(
        '[auth] MONGO_URI is missing. Add it to .env.local (and to your host env in production).',
    );
}

// Reuse a single MongoClient across hot-reloads (dev) and warm serverless
// invocations (prod) so we never exhaust the connection pool.
function getClient() {
    if (!globalThis.__mongoClient) {
        globalThis.__mongoClient = new MongoClient(uri, {
            family: 4,
            // Fail fast (≈8s) with a clear error rather than hanging for 30s.
            serverSelectionTimeoutMS: 8000,
            connectTimeoutMS: 10000,
            socketTimeoutMS: 20000,
            maxPoolSize: 10,
        });
    }
    return globalThis.__mongoClient;
}

const client = getClient();
const db = client.db('skillsphereDB');

export const auth = betterAuth({
    database: mongodbAdapter(db, { client }),
    // BetterAuth reads BETTER_AUTH_SECRET from env; set baseURL explicitly for prod.
    baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
    emailAndPassword: { enabled: true },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
    },
});
