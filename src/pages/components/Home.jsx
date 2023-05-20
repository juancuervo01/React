import { FoodMenuCard } from '@/components/cards'
import { getDailyFoodMenus } from '@/services/endpoints'
import { modals } from '@/utils/modals'
import { PageSpinner } from '@/components/spinners'
import { sessionRoles } from '@/utils/roles'
import { useAuth } from '@/hooks/useAuth'
import { useEffect, useState } from 'react'
import { useModal } from '@/hooks/useModal'
import { useTips } from '@/hooks/useTips'

export default function HomePage() {
  const [foodMenus, setFoodMenus] = useState([])
  const [loading, setLoading] = useState(true)
  const { homeAdminInitial, homeUserInitial } = useTips()
  const { session } = useAuth()
  const { setModalView, openModal } = useModal()

  const initialModalsViews = {
    [sessionRoles.admin]: modals.homeAdminInitial,
    [sessionRoles.user]: modals.homeUserInitial
  }

  useEffect(() => {
    if (homeAdminInitial && session.role === sessionRoles.admin) {
      const modalView = initialModalsViews[session.role]
      setModalView(modalView)
      openModal()
    }

    if (homeUserInitial && session.role === sessionRoles.user) {
      const modalView = initialModalsViews[session.role]
      setModalView(modalView)
      openModal()
    }
  }, [])

  useEffect(() => {
    getDailyFoodMenus()
      .then((foodMenus) => setFoodMenus(foodMenus))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <PageSpinner text="Cargando lista de menús de comida..." />
  }

  if (foodMenus.length === 0) {
    return (
      <p className="text-center mt-12">
        Ups 😓 no hay menús disponibles pero debes saber que estamos trabajando cada día para mejorar el servicio
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {foodMenus.map((foodMenu) => (
        <article className='h-full' key={foodMenu.id}>
          <FoodMenuCard showReserveButton={session.role === sessionRoles.user} {...foodMenu} />
        </article>
      ))}
    </div>
  )
}
