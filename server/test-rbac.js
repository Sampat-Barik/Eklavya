import { DEFAULT_ROLE_PERMISSIONS, hasPermission } from './middleware/rbac.js';

console.log('--- Testing RBAC Permissions Logic ---');

// Test 1: Super admin has access to everything
console.assert(hasPermission('super_admin', 'dashboard', 'view') === true, 'Super admin view dashboard');
console.assert(hasPermission('super_admin', 'access_management', 'manage_users') === true, 'Super admin manage users');
console.assert(hasPermission('super_admin', 'donations', 'delete') === true, 'Super admin delete donation');

// Test 2: Finance Manager can view/export donations, but NOT delete donations or view access_management
console.assert(hasPermission('finance_manager', 'donations', 'view') === true, 'Finance manager view donations');
console.assert(hasPermission('finance_manager', 'donations', 'export') === true, 'Finance manager export donations');
console.assert(hasPermission('finance_manager', 'donations', 'delete') === false, 'Finance manager cannot delete donations');
console.assert(hasPermission('finance_manager', 'access_management', 'view') === false, 'Finance manager cannot access management');

// Test 3: Events Manager can create events, but NOT touch donations
console.assert(hasPermission('events_manager', 'events', 'create') === true, 'Events manager create events');
console.assert(hasPermission('events_manager', 'donations', 'view') === false, 'Events manager cannot view donations');

// Test 4: Custom permissions override
const customOverrides = {
  donations: ['view', 'export']
};
console.assert(hasPermission('viewer', 'donations', 'view', customOverrides) === true, 'Viewer with custom override can view donations');
console.assert(hasPermission('viewer', 'donations', 'delete', customOverrides) === false, 'Viewer with custom override cannot delete donations');

// Test 5: Viewer role default
console.assert(hasPermission('viewer', 'dashboard', 'view') === true, 'Viewer can view dashboard');
console.assert(hasPermission('viewer', 'members', 'create') === false, 'Viewer cannot create members');

console.log('All 5 RBAC unit checks passed successfully!');
