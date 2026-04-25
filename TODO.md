# Admin Auth Pages Implementation

## Steps

1. [x] Update `types/user.types.ts` — add optional `role` to `User` and admin auth types
2. [x] Update `services/authService.ts` — add `adminLogin` and `adminRegister` methods
3. [x] Update `lib/api.ts` — improve 401 interceptor to distinguish admin vs user routes
4. [x] Create `app/(auth)/auth/admin/login/page.tsx` — admin login page with same UI as normal login
5. [x] Create `app/(auth)/auth/admin/register/page.tsx` — admin signup page with same UI as normal register
6. [x] Update `hooks/useAuth.ts` — add admin login/register helpers that redirect to `/admin`
7. [ ] Verify pages compile and routes resolve correctly

