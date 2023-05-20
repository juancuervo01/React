import { getUserReservers } from '@/services/endpoints'
import { HashLoader } from 'react-spinners'
import { useEffect, useState } from 'react'
import ReserveListCard from '@/components/cards/ReserveListCard'
import { useModal } from '@/hooks/useModal'
import { useTips } from '@/hooks/useTips'
import { modals } from '@/utils/modals'

export default function ReserveListPage() {
  const [reserveList, setReserversList] = useState([])
  const [filteredList, setFilteredList] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  const { setModalView, openModal } = useModal()
  const { reservesListInitial } = useTips()

  useEffect(() => {
    if (reservesListInitial) {
      setModalView(modals.reservesListInitial)
      openModal()
    }
  }, [])

  useEffect(() => {
    const results = reserveList.filter((ctx) => ctx.name.trim().toLowerCase().includes(search.toLowerCase()))
    setFilteredList(results)
  }, [search])

  useEffect(() => {
    getUserReservers()
      .then((userTickets) => {
        setReserversList(userTickets)
        setFilteredList(userTickets)
      })
      .catch((error) => console.error(error.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="h-screen flex flex-col gap-4 items-center justify-center">
        <HashLoader color="#00AAFF" />
        <p>Cargando la lista de reservas...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 p-4">
      <div className="flex flex-col gap-4">
        <div className="bg-white flex justify-center">
          <input
            className="border p-4 max-w-xl w-full"
            placeholder="Buscar por nombre de usuario"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <ul className="flex flex-col gap-4">
          {filteredList.map((r) => (
            <li className="border py-2 px-4" key={r.id}>
              <ReserveListCard {...r} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
