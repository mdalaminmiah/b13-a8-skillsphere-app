import dns from 'node:dns';
import { promisify } from 'node:util';

// Switch to Google DNS BEFORE any import touches MongoDB
// This bypasses ISP DNS that blocks SRV record queries
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
dns.setDefaultResultOrder('ipv4first');

// Quick self-test — logs to terminal so you can confirm DNS is working
const resolveSrv = promisify(dns.resolveSrv);
resolveSrv('_mongodb._tcp.cluster0.owkcmpq.mongodb.net')
    .then(() => console.log('✅  DNS SRV resolved via Google DNS'))
    .catch((err) =>
        console.warn('⚠   SRV still failing:', err.code, '— use Fix B below'),
    );
