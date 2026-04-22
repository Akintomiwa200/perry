'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

export default function LoginPage() {
  const router = useRouter()
  const { login, isLoading, error } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

  const validate = () => {
    const e: typeof errors = {}
    if (!email || !/\S+@\S+\.\S+/.test(email))
      e.email = 'A valid email is required'
    if (!password || password.length < 6)
      e.password = 'Password must be at least 6 characters'

    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    if (!validate()) return

    const result = await login({ email, password })
    if (result.success) router.push('/shop')
  }

  return (
    <main className="w-full max-w-md mx-auto px-4 py-10 sm:py-16">

      {/* CARD */}
      <div className="bg-white border border-[var(--blush)] rounded-lg shadow-sm p-6 sm:p-8">

        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-2xl sm:text-3xl font-light text-[var(--deep)]">
            Welcome back
          </h1>
          <p className="text-sm text-[var(--mid)] mt-2">
            Sign in to your account
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-4 p-3 text-sm bg-red-100 text-red-700 border-l-4 border-red-700 rounded">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* EMAIL */}
          <div>
            <label className="text-xs font-medium text-[var(--deep)]">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jane@example.com"
              className={`w-full mt-1 px-3 py-2 text-sm border rounded focus:outline-none focus:ring-1 ${
                errors.email
                  ? 'border-red-600 focus:ring-red-600'
                  : 'border-[var(--blush)] focus:ring-[var(--terracotta)]'
              }`}
            />
            {errors.email && (
              <p className="text-xs text-red-600 mt-1">{errors.email}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-xs font-medium text-[var(--deep)]">
              Password
            </label>

            <div className="relative mt-1">
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full px-3 py-2 pr-14 text-sm border rounded focus:outline-none focus:ring-1 ${
                  errors.password
                    ? 'border-red-600 focus:ring-red-600'
                    : 'border-[var(--blush)] focus:ring-[var(--terracotta)]'
                }`}
              />

              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[var(--mid)]"
              >
                {showPw ? 'Hide' : 'Show'}
              </button>
            </div>

            {errors.password && (
              <p className="text-xs text-red-600 mt-1">
                {errors.password}
              </p>
            )}
          </div>

          {/* FORGOT PASSWORD */}
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-xs text-[var(--terracotta)] hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[var(--deep)] text-[var(--cream)] py-3 text-xs tracking-widest uppercase hover:opacity-90 transition"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-center text-sm mt-6 text-[var(--mid)]">
          Don&apos;t have an account?{' '}
          <Link
            href="/register"
            className="text-[var(--terracotta)] font-medium"
          >
            Create one
          </Link>
        </p>

      </div>
    </main>
  )
}