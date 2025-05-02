"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { Button } from '@/components/Button'
import { toast } from 'sonner'

const Login = () => {
  const [mode, setMode] = useState(null)//login signup toggle
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    document.title = "Login - Feed a Cat";

    if (status === "loading") return; // Wait until session is determined

    if (session) {
      router.push("/dashboard");
    }
  }, [session, status, router]);

  const inputCss = "mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1";

  //submit form
  const handleSubmit = async (e) => {
    console.log("handleSignupSubmit fired")
    e.preventDefault()
    setError("")

    if (mode === "login") {
      const res = await signIn("credentials", {
        redirect: false,
        identifier,
        password,
      })
      if (res.error) {
        setError(res.error)
      } else {
        router.push("/dashboard")
      }
    }

    if (mode === "signup") {
      // Signup logic here — post to your own API route
      try {
        const res = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: identifier, email, password }),
        })

        const data = await res.json()
        if (!res.ok) {
          setError(data.message || "Registration failed")
          toast.error(data.message || "Registration failed")
          return
        }
        toast.success("Registration successful!")

        // Optionally auto-login
        

        router.push("/dashboard")
      } catch (err) {
        setError(err.message)
      }
    }
  }

  const handleSpace=(e) => {
    if (e.key === ' ') {
      e.preventDefault();
    }
  }

  return (



    <div>
      <h2 className="text-3xl font-bold text-center py-14 "> Login to use features of website.</h2>
      <div className="w-full max-w-sm sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto mt-7 flex flex-col gap-2 p-4">

        <button
          className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60" onClick={() => { signIn("github") }}><img
            src="https://www.svgrepo.com/show/512317/github-142.svg" alt="GitHub"
            className="h-[18px] w-[18px] " />
          Continue with GitHub
        </button>

        <button
          className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"><img
            src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google"
            className="h-[18px] w-[18px] " />Continue with
          Google
        </button>


        <button onClick={() => setMode("login")} className={` ${Button}`}>Login</button>
        <button onClick={() => setMode("signup")} className={`${Button}`}>Signup</button>


        {mode && (
          <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3 ">

            {mode === "signup" && (
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                placeholder="Email Address"
                className={inputCss}
                required
              />
            )}

            <input
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              onKeyDown={handleSpace}
              type="text"
              name="username"
              placeholder={mode === "login" ? "Email or Username" : "Username"}
              className={inputCss}
              required
            />

            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              placeholder="Password"
              className={inputCss}
              required
            />

            {mode === "login" && (
              <p className="text-sm text-gray-500">
                <Link href="#" className="text-blue-800 hover:text-blue-600">Reset your password?</Link>
              </p>
            )}

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button type="submit" className={`inline-flex mt-2 w-full ${Button}`}>
              Continue
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default Login