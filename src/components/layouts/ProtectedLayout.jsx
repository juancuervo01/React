import { Footer, Header, Navbar } from '@/components/common'
import { Outlet } from 'react-router-dom'
import FallbackLoader from '@/components/FallbackLoader'
import { Suspense } from 'react'
export default function ProtectedLayout() {
  return (
    <Suspense fallback={<FallbackLoader />}>
      <Header />
      <Navbar />
      <main className="min-h-screen bg-center bg-no-repeat bg-unicauca">
        <Outlet />
      </main>
      <Footer />
    </Suspense>
  )
}
