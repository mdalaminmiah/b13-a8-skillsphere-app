// src/lib/db.js — MUST be imported first by auth.js.
// Some ISPs block MongoDB SRV/DNS lookups; routing DNS through Google/Cloudflare
// and preferring IPv4 makes Atlas connections resolve reliably.
import dns from 'node:dns';

try {
    dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
    dns.setDefaultResultOrder('ipv4first');
} catch {
    // Non-fatal: fall back to the system resolver.
}
