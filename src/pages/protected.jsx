import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import ProtectedLayout from '@/components/layouts/ProtectedLayout'

const HomePage = lazy(() => import('@/pages/components/Home'))
const Information = lazy(() => import('@/pages/components/Information'))
const PurchasesPage = lazy(() => import('@/pages/components/Purchases'))
const ReserveListPage = lazy(() => import('@/pages/components/ReserveList'))
const ReservePage = lazy(() => import('@/pages/components/Reserve'))
const TicketsListPage = lazy(() => import('@/pages/components/TicketsList'))

export const protectedRoutes = [
  {
    element: <ProtectedLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/reserve/:id',
        element: <ReservePage />
      },
      {
        path: '/purchases',
        element: <PurchasesPage />
      },
      {
        path: '/reserve-list',
        element: <ReserveListPage />
      },
      {
        path: '/tickets-list',
        element: <TicketsListPage />
      },
      {
        path: '/information',
        element: <Information />
      },
      {
        path: '*',
        element: <Navigate to="/" />
      }
    ]
  }
]
