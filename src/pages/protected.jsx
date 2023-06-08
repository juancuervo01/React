import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import ProtectedLayout from '@/components/layouts/ProtectedLayout'

const HomePage = lazy(() => import('@/pages/components/Home'))
const Information = lazy(() => import('@/pages/components/Information'))
const AddListPages = lazy(() => import('@/pages/components/AddList'))
const AddProduct = lazy(() => import('@/pages/components/AddProduct'))
const ManageProducts = lazy(() => import('@/pages/components/ManageProducts'))
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
        path: '/AddList',
        element: <AddListPages />
      },
      {
        path: '/AddProduct',
        element: <AddProduct />
      },
      {
        path: '/information',
        element: <Information />
      },
      {
        path: '/manage-products/:idlista',
        element: <ManageProducts />
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
