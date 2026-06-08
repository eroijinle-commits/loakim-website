// Auth API — placeholder for future Clerk integration
//
// The current auth pages (Login, Register, ForgotPassword, ResetPassword)
// are UI-only forms. When migrating auth to Clerk, replace these with
// Clerk React components (<SignIn />, <SignUp />, useAuth() hook, etc.)
//
// See MIGRATION-SUPABASE-TO-NEON.md Phase 2 for implementation guide.

export async function signUp(_email: string, _password: string, _fullName: string, _companyName?: string) {
  throw new Error('Auth not yet migrated. See MIGRATION-SUPABASE-TO-NEON.md')
}

export async function signIn(_email: string, _password: string) {
  throw new Error('Auth not yet migrated. See MIGRATION-SUPABASE-TO-NEON.md')
}

export async function signOut() {
  throw new Error('Auth not yet migrated. See MIGRATION-SUPABASE-TO-NEON.md')
}

export async function resetPassword(_email: string) {
  throw new Error('Auth not yet migrated. See MIGRATION-SUPABASE-TO-NEON.md')
}

export async function updatePassword(_newPassword: string) {
  throw new Error('Auth not yet migrated. See MIGRATION-SUPABASE-TO-NEON.md')
}

export async function getCurrentUser() {
  return null
}

export async function getSession() {
  return null
}
