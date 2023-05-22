import './index.css'
import { AuthProvider } from '@/hooks/useAuth'
import { Toaster } from 'react-hot-toast'
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import Routes from '@/pages/Routes'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Suspense fallback={undefined}>
        <AuthProvider>
          <Routes />
        </AuthProvider>
    <Toaster />
  </Suspense>
)
