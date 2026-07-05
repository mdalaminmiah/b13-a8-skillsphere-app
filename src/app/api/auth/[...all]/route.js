// src/app/api/auth/[...all]/route.js
import { auth } from '@/lib/auth'; // Your server-side auth config
import { toNextJsHandler } from 'better-auth/next-js';

// Ensure this is the ONLY thing in this file
const handler = toNextJsHandler(auth);

export const { POST, GET } = handler;
