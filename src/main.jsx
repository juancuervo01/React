import './index.css'
import { AuthProvider } from '@/hooks/useAuth'
import { ModalProvider } from '@/hooks/useModal'
import { TipsProvider } from '@/hooks/useTips'
import { Toaster } from 'react-hot-toast'
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import Routes from '@/pages/Routes'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Suspense fallback={undefined}>
    <ModalProvider>
      <TipsProvider>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </TipsProvider>
    </ModalProvider>
    <Toaster />
  </Suspense>
)
