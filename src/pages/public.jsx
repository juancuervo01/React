import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import PublicLayout from '@/components/layouts/PublicLayout'

const LoginPage = lazy(() => import('@/pages/components/Login'))
const RegisterPage = lazy(() => import('@/pages/components/Register'))

export const publicRoutes = [
  {
    element: <PublicLayout />,
    children: [
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/register',
        element: <RegisterPage />
      },
      {
        path: '*',
        element: <Navigate to="/login" />
      }
    ]
  }
]
