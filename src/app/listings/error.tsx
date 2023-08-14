'use client'
 
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
 
export const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
  
  const router = useRouter()

  const handleReset = () => {
    router.push('/')
  }

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
        onClick={
            handleReset
        }
      >
        Go to home
      </button>
    </div>
  )
}

export default Error