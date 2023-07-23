'use client'
import { useCallback, useState } from "react";
import { XCircleIcon } from '@heroicons/react/20/solid'
import axios from "axios"
import { NextResponse } from 'next/server';
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export const Register = () => {

  const [isLoading, setIsLoading] = useState(false)

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("")
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");

  const router = useRouter();

  const resetState = () => {
    setError(""),
    setEmailError(""),
    setPasswordError(""),
    setPasswordConfirmError("")
  };
  
  const handleRegister = useCallback(async () => {
    try {
      resetState()
      setIsLoading(true)
        await axios.post('/api/register', {
        email,
        username,
        password,
        confirmPassword
    })
    } catch (error: any) {
    setIsLoading(false)
    const { errorData } = error.response
    const { data } = error.response.data;
    setError(errorData)
    setEmailError(data.email)
    setPasswordError(data.password)
    if(data.password.includes('confirmation')) {
      setPasswordConfirmError(data.password)
    }} finally {
      if (isLoading == true) {
      const data = {email, username, password, confirmPassword};
      signIn('credentials', {
        ...data,
        redirect: false,
      });
      router.push('/')
    }
    }
  }, [email, username, password, confirmPassword])

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-white">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign up</h2>
  </div>
  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
  {(emailError || passwordError || error) && (
    <div className="rounded-md bg-red-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">There were errors with your submission</h3>
          <div className="mt-2 text-sm text-red-700">
            <ul role="list" className="list-disc pl-5 space-y-1">
              {error && <li>{error}</li>}
              {emailError && <li>{emailError}</li>}
              {nameError && <li>{nameError}</li>}
              {passwordError && <li>{passwordError}</li>}
            </ul>
          </div>
        </div>
      </div>
    </div>
    )}
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
              type="email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              id="email"
              className={`block  w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ${
                emailError ? 'rounded-md ring-inset-2 ring-2 ring-red-400' : ''
              } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-british-green-2 sm:text-sm sm:leading-6`}
            />
          </div>
        </div>
        </div>
        <div>
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium leading-6 text-gray-900">Username</label>
        </div>
        <div className="mt-2">
        <div>
            <input
              onChange={(e) => setUsername(e.target.value)}
              required
              className={`block  w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ${
                nameError ? 'rounded-md ring-inset-2 ring-2 ring-red-400' : ''
              } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-british-green-2 sm:text-sm sm:leading-6`}
            />
          </div>
        </div>
        </div>
      <div>
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium leading-6 text-gray-900">Password</label>
        </div>
        <div className="mt-2">
          <div>
            <input
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`block  w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ${
                passwordError ? 'rounded-md ring-inset-2 ring-2 ring-red-400' : ''
              } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-british-green-2 sm:text-sm sm:leading-6`}
            />
          </div>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
        </div>
        <div>
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className={`block  w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ${
                passwordConfirmError ? 'rounded-md ring-inset-2 ring-2 ring-red-400' : ''
              } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-british-green-2 sm:text-sm sm:leading-6`}
            />
          </div>
      </div>
      <div>
        <button onClick={handleRegister} className="flex w-full justify-center rounded-md bg-british-green-3 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-british-green-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign up</button>
      </div>
    </div>
    <p className="mt-10 text-center text-sm text-gray-500"
      onClick={() => router.push('/signin')}
      >
      Already a member?
      <a className="cursor-pointer font-semibold leading-6 px-1 text-british-green-2 hover:british-green-0">
        Log in now
        </a>
    </p>
  </div>
</div> 
)
};

export default Register
