import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { protectedRoutes } from '@/pages/protected'
import { publicRoutes } from '@/pages/public'
import { useAuth } from '@/hooks/useAuth'

export default function Routes() {
  const { session } = useAuth()

  const routes = session ? protectedRoutes : publicRoutes
  const router = createBrowserRouter(routes)

  return <RouterProvider router={router} />
}
