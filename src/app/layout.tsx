import './globals.css'
import { Inter } from 'next/font/google'
import AuthContext from './context/AuthContext'
import Navbar from '../../components/navbar'
import './globals.css'
import getCurrentUser from './actions/getCurrentUser'
import { Suspense } from 'react'
import LoadingComponent from './loading'
import Footer from '../../components/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
})
{
  const currenUser = await getCurrentUser() 
  return (
    <html lang="en">
      <body className="flex flex-col h-screen justify-between">
        <AuthContext>
        <Suspense fallback={<LoadingComponent />}>
          <Navbar currentUser={currenUser!}/>
          <div className="mb-auto">
          {children}
          </div>
          <Footer />
        </Suspense>
        </AuthContext>
      </body>
    </html>
  )
}
