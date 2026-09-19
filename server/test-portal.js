import portalRoutes from './routes/portalRoutes.js';

console.log('--- Testing Portal Routes Module ---');
console.assert(typeof portalRoutes === 'function', 'portalRoutes is a valid Express Router');
console.log('Portal routes module loaded and validated successfully!');
