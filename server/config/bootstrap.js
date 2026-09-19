import { AllowedUser } from '../models/AllowedUser.js';

/**
 * Bootstrap Super Admins from SUPER_ADMIN_EMAILS environment variable
 * Ensures initial access can be granted without manual DB edits or code modifications.
 */
export const bootstrapSuperAdmins = async () => {
  const envEmails = process.env.SUPER_ADMIN_EMAILS;
  if (!envEmails) {
    console.log('[RBAC Bootstrap] No SUPER_ADMIN_EMAILS provided in environment.');
    return;
  }

  const emails = envEmails
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter((email) => email.length > 0);

  if (emails.length === 0) return;

  console.log(`[RBAC Bootstrap] Checking ${emails.length} super admin accounts...`);

  for (const email of emails) {
    try {
      const existing = await AllowedUser.findOne({ email });
      if (!existing) {
        const nameFallback = email.split('@')[0].replace(/[._-]/g, ' ');
        const formattedName = nameFallback
          .split(' ')
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' ');

        await AllowedUser.create({
          name: formattedName || 'Super Admin',
          email,
          role: 'super_admin',
          status: 'active',
          createdBy: 'env_bootstrap'
        });
        console.log(`[RBAC Bootstrap] Initialized Super Admin: ${email}`);
      } else {
        let changed = false;
        if (existing.role !== 'super_admin') {
          existing.role = 'super_admin';
          changed = true;
        }
        if (existing.status !== 'active') {
          existing.status = 'active';
          changed = true;
        }
        if (changed) {
          await existing.save();
          console.log(`[RBAC Bootstrap] Re-asserted Super Admin active status: ${email}`);
        }
      }
    } catch (err) {
      console.warn(`[RBAC Bootstrap] Warning while provisioning ${email}:`, err.message);
    }
  }
};
