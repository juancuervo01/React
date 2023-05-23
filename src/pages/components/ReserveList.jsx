import { getUserReservers } from '@/services/endpoints'
import { HashLoader } from 'react-spinners'
import { useEffect, useState } from 'react'
import ListCard from '@/components/cards/ListCard'

export default function ReserveListPage() {
  const [reserveList, setReserversList] = useState([])
  const [filteredList, setFilteredList] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

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
        <p>Cargando las listas de compras...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 p-4">
      <div className="flex flex-col gap-4">
        <div className="bg-white flex justify-center">
          <input
            className="border p-4 max-w-xl w-full"
            placeholder="Buscar por nombre de lista"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <ul className="flex flex-col gap-4">
          {filteredList.map((r) => (
            <li className="border py-2 px-4" key={r.id}>
              <ListCard {...r} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
