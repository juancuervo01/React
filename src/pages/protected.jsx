import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import ProtectedLayout from '@/components/layouts/ProtectedLayout'

const HomePage = lazy(() => import('@/pages/components/Home'))
const Information = lazy(() => import('@/pages/components/Information'))
const AddListPages = lazy(() => import('@/pages/components/AddList'))
const ReserveListPage = lazy(() => import('@/pages/components/ReserveList'))
const ReservePage = lazy(() => import('@/pages/components/Reserve'))
const TicketsListPage = lazy(() => import('@/pages/components/TicketsList'))
const ManageFoodMenus = lazy(() => import('@/pages/components/ManageFoodMenus'))
const HomeProducts = lazy(() => import('@/pages/components/HomeProducts'))
const EditList = lazy(() => import('@/pages/components/EditList'))
const EditProduct = lazy(() => import('@/pages/components/EditProduct'))

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
        path: '/addList',
        element: <AddListPages />
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
        path: '/manage-food-menus/:idlista',
        element: <ManageFoodMenus />
      },
      {
        path: '/edit-list/:idlista',
        element: <EditList/>
      },
      {
        path: '/edit-product/:idproducto',
        element: <EditProduct/>
      },
      {
        path: '/edit-product/-',
        element: <EditProduct/>
      },
      {
        path: '*',
        element: <Navigate to="/" />
      },
      {
        path: '/home-products',
        element: <HomeProducts />
      }
    ]
  }
]
