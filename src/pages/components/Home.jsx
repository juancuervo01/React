import { getAllShoppingList } from '@/services/endpoints'
import { PageSpinner } from '@/components/spinners'
// import { sessionRoles } from '@/utils/roles'
// import { useAuth } from '@/hooks/useAuth'
import { useEffect, useState } from 'react'

export default function HomePage() {
  const [shoppingList, setShoppingList] = useState([])
  const [loading, setLoading] = useState(true)
  // const { session } = useAuth()

  useEffect(() => {
    getAllShoppingList()
      .then((shoppingList) => setShoppingList(shoppingList))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <PageSpinner text="Cargando lista de compras..." />
  }

  if (shoppingList.length === 0) {
    return (
      <p className="text-center mt-12">
       ¡Realiza tu primera lista de compras! Haz click en añadir lista.
      </p>
    )
  }
  return (
    <div>
      <h1>Lista de compras</h1>
      <ul>
        {shoppingList.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  )
  /*  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {shoppingList.map((shoppingList) => (
        <article className='h-full' key={shoppingList.id}>
          <FoodMenuCard showReserveButton={session.role === sessionRoles.user} {...shoppingList} />
        </article>
      ))}
    </div>
  ) */
}
