import { getAllShoppingList, deleteList } from '@/services/endpoints'
import { PageSpinner } from '@/components/spinners'
import { useEffect, useState } from 'react'
import ListCard from '@/components/cards/ListCard'
import { useAuth } from '@/hooks/useAuth'
import Button2 from '@/components/ui/Button2'
import PropagateLoader from 'react-spinners/PropagateLoader'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { AiOutlinePlus } from 'react-icons/ai'

export default function HomePage() {
  const navigate = useNavigate()
  const { session } = useAuth()
  const [shoppingList, setShoppingList] = useState([])
  const [filteredList, setFilteredList] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllShoppingList(session.idusuario)
      .then((shoppingList) => setShoppingList(shoppingList))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    const results = shoppingList.filter((item) => item.nombre_lista.trim().toLowerCase().includes(search.toLowerCase()))
    setFilteredList(results)
  }, [search, shoppingList])

  const Spinner = () => (
    <PropagateLoader
      cssOverride={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      color="#FFFFFF"
      className="h-6"
    />
  )

  const handleDelete = (idlista) => {
    deleteList(idlista)
      .then(() => {
        toast.success('Lista eliminada')
        getAllShoppingList(session.idusuario)
          .then((shoppingList) => {
            setShoppingList(shoppingList)
            setFilteredList(shoppingList)
          })
          .catch((error) => console.error(error))
      })
      .catch((error) => console.error(error))
  }

  if (loading) {
    return <PageSpinner text="Cargando lista de compras..." />
  }

  if (shoppingList.length === 0) {
    return (
      <div className="bg-white flex flex-col items-center justify-center">
        <>
          <p className="text-center mt-12">
            ¡Realiza tu primera lista de compras! Haz click en añadir lista.
          </p>
          <Button2 type="submit" disabled={loading} onClick={() => navigate('/AddList')}>
            {loading ? <Spinner /> : 'Añadir Lista'}
            <AiOutlinePlus className="ml-1" size={30}/>
          </Button2>
        </>
    </div>
    )
  }
  return (
    <div className="container mx-auto px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 p-4">
      <div className="flex flex-col gap-4">
        <div className="bg-white flex justify-center gap-10">
          <input
            className="border p-4 max-w-xl w-full"
            placeholder="Buscar por nombre de lista"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button2 type="submit" disabled={loading} onClick={() => navigate('/AddList')}>
            <AiOutlinePlus className="ml-1" size={30}/>
            {loading ? <Spinner /> : 'Añadir Lista'}
          </Button2>
        </div>
        <ul className="flex flex-col gap-4">
          {filteredList.map((r) => (
            <li className="border py-2 px-4" key={r.idlista}>
              <ListCard handleDelete={handleDelete}{...r} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
