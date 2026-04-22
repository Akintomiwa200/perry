'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

export default function RegisterPage() {
  const router = useRouter()
  const { register, isLoading, error } = useAuth()

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirm: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [field]: e.target.value }))

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.firstName) e.firstName = 'First name is required'
    if (!form.lastName) e.lastName = 'Last name is required'
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email))
      e.email = 'A valid email is required'
    if (!form.password || form.password.length < 8)
      e.password = 'Password must be at least 8 characters'
    if (form.password !== form.confirm)
      e.confirm = 'Passwords do not match'

    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    const result = await register({
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      password: form.password,
    })

    if (result.success) router.push('/shop')
  }

  return (
    <main className="w-full max-w-md mx-auto px-4 py-10 sm:py-16">
      
      {/* CARD */}
      <div className="bg-white border border-[var(--blush)] rounded-lg shadow-sm p-6 sm:p-8">
        
        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-2xl sm:text-3xl font-light text-[var(--deep)]">
            Create your account
          </h1>
          <p className="text-sm text-[var(--mid)] mt-2">
            Join thousands of collectors
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-5 p-3 bg-red-100 text-red-700 border-l-4 border-red-700 text-sm rounded">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* NAME GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div>
              <label className="text-xs font-medium text-[var(--deep)]">
                First Name
              </label>
              <input
                type="text"
                value={form.firstName}
                onChange={set('firstName')}
                placeholder="Jane"
                className={`w-full mt-1 px-3 py-2 text-sm border rounded focus:outline-none focus:ring-1 ${
                  errors.firstName
                    ? 'border-red-600 focus:ring-red-600'
                    : 'border-[var(--blush)] focus:ring-[var(--terracotta)]'
                }`}
              />
              {errors.firstName && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.firstName}
                </p>
              )}
            </div>

            <div>
              <label className="text-xs font-medium text-[var(--deep)]">
                Last Name
              </label>
              <input
                type="text"
                value={form.lastName}
                onChange={set('lastName')}
                placeholder="Doe"
                className={`w-full mt-1 px-3 py-2 text-sm border rounded focus:outline-none focus:ring-1 ${
                  errors.lastName
                    ? 'border-red-600 focus:ring-red-600'
                    : 'border-[var(--blush)] focus:ring-[var(--terracotta)]'
                }`}
              />
              {errors.lastName && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.lastName}
                </p>
              )}
            </div>

          </div>

          {/* EMAIL */}
          <div>
            <label className="text-xs font-medium text-[var(--deep)]">
              Email Address
            </label>
            <input
              type="email"
              value={form.email}
              onChange={set('email')}
              placeholder="jane@example.com"
              className={`w-full mt-1 px-3 py-2 text-sm border rounded focus:outline-none focus:ring-1 ${
                errors.email
                  ? 'border-red-600 focus:ring-red-600'
                  : 'border-[var(--blush)] focus:ring-[var(--terracotta)]'
              }`}
            />
            {errors.email && (
              <p className="text-xs text-red-600 mt-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-xs font-medium text-[var(--deep)]">
              Password
            </label>
            <input
              type="password"
              value={form.password}
              onChange={set('password')}
              placeholder="Min. 8 characters"
              className={`w-full mt-1 px-3 py-2 text-sm border rounded focus:outline-none focus:ring-1 ${
                errors.password
                  ? 'border-red-600 focus:ring-red-600'
                  : 'border-[var(--blush)] focus:ring-[var(--terracotta)]'
              }`}
            />
            {errors.password && (
              <p className="text-xs text-red-600 mt-1">
                {errors.password}
              </p>
            )}
          </div>

          {/* CONFIRM */}
          <div>
            <label className="text-xs font-medium text-[var(--deep)]">
              Confirm Password
            </label>
            <input
              type="password"
              value={form.confirm}
              onChange={set('confirm')}
              placeholder="Re-enter password"
              className={`w-full mt-1 px-3 py-2 text-sm border rounded focus:outline-none focus:ring-1 ${
                errors.confirm
                  ? 'border-red-600 focus:ring-red-600'
                  : 'border-[var(--blush)] focus:ring-[var(--terracotta)]'
              }`}
            />
            {errors.confirm && (
              <p className="text-xs text-red-600 mt-1">
                {errors.confirm}
              </p>
            )}
          </div>

          {/* TERMS */}
          <p className="text-xs text-[var(--mid)] leading-relaxed">
            By creating an account you agree to our{' '}
            <Link href="/terms" className="text-[var(--terracotta)] underline">
              Terms
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-[var(--terracotta)] underline">
              Privacy Policy
            </Link>.
          </p>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[var(--deep)] text-[var(--cream)] py-3 text-xs tracking-widest uppercase hover:opacity-90 transition"
          >
            {isLoading ? 'Creating account...' : 'Create Account'}
          </button>

        </form>

        {/* FOOTER */}
        <p className="text-center text-sm mt-6 text-[var(--mid)]">
          Already have an account?{' '}
          <Link href="/login" className="text-[var(--terracotta)] font-medium">
            Sign in
          </Link>
        </p>

      </div>
    </main>
  )
}