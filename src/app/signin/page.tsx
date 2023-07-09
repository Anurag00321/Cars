'use client'
import { SessionProvider, signIn, signOut, useSession  } from "next-auth/react";
import { redirect } from 'next/navigation';
import { useRouter } from "next/navigation";
import { useEffect, useState, FC } from "react";
// import { XCircleIcon, ExclamationCircleIcon } from '@heroicons/react/20/solid'

export const SignIn: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  
  const [username, setUsername] = useState("");

  const session = useSession()
  const router = useRouter();
  
  const handleLogin = async () => {
        signIn('credentials', {
            email,
            password
        })
        if (session.status == "authenticated") {
            try {
            console.log('Signed in!')
            return <p>Signed in as {session.data.user?.name}</p>
            } catch (error) {
                console.log(error)
            } finally {
                // redirect("http://localhost:3000")
                router.push('/')
            }
        }        
    };

  const handleSignOut = () => {
    signOut;
    router.push('/')
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-white">
      <h1>Hi, {username}!</h1>
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    {(emailError || passwordError) && (
    <div className="rounded-md bg-red-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          {/* <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" /> */}
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">There were errors with your submission</h3>
          <div className="mt-2 text-sm text-red-700">
            <ul role="list" className="list-disc pl-5 space-y-1">
              {emailError && <li>{emailError}</li>}
              {passwordError && <li>{passwordError}</li>}
            </ul>
          </div>
        </div>
      </div>
    </div>
    )}
  <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Log in to your account</h2>
  </div>
  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <div className="space-y-6">
    <div>
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
        </div>
          <div className="mt-2">
          <div>
          <input
            onChange={(e) => setEmail(e.target.value)}
            required
            className={`block  w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ${
              emailError ? 'rounded-md ring-inset-2 ring-2 ring-red-400' : ''
            } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            />
            </div>
          </div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium leading-6 text-gray-900">Password</label>
          <div className="text-sm">
            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
          </div>
        </div>
        <div className="mt-2">
          <div>
            <input
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`block  w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ${
                passwordError ? 'rounded-md ring-inset-2 ring-2 ring-red-400' : ''
              } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            />
          </div>
        </div>
      </div>
      <div>
        <button onClick={handleLogin} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Log in
        </button>
        {/* test button */}
        <button onClick={handleSignOut} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Sign out
        </button>
      </div>
    <p className="mt-10 text-center text-sm text-gray-500">
      Not a member?
      <a className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign up now</a>
    </p>
    </div>
    </div>
  </div>
  )
};

export default SignIn