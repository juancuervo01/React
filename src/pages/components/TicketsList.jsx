import { deleteTicketHolder, getUsersTickets, takeOffTicket } from '@/services/endpoints'
import { useEffect, useState } from 'react'
import { HashLoader } from 'react-spinners'
import { TicketListCard } from '@/components/cards'
import { toast } from 'react-hot-toast'
import { useModal } from '@/hooks/useModal'
import { useTips } from '@/hooks/useTips'
import { modals } from '@/utils/modals'

export default function TicketsListPage() {
  const [ticketsList, setTicketsList] = useState([])
  const [filteredList, setFilteredList] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  const { setModalView, openModal } = useModal()
  const { ticketsListInitial } = useTips()

  useEffect(() => {
    if (ticketsListInitial) {
      setModalView(modals.ticketsListInitial)
      openModal()
    }
  }, [])

  useEffect(() => {
    const results = ticketsList.filter((ctx) => ctx.name.trim().toLowerCase().includes(search.toLowerCase()))
    setFilteredList(results)
  }, [search])

  useEffect(() => {
    getUsersTickets()
      .then((userTickets) => {
        setTicketsList(userTickets)
        setFilteredList(userTickets)
      })
      .catch((error) => console.error(error.message))
      .finally(() => setLoading(false))
  }, [])

  const handleTakeOff = (id, { setConfirm, setLoading }) => {
    setLoading(true)
    setTimeout(() => {
      takeOffTicket(id)
        .then(() => {
          toast.success('Almuerzo anotado')

          const newList = ticketsList.map((tc) => {
            if (tc.id === id) {
              return {
                ...tc,
                availables: tc.availables - 1
              }
            }
            return tc
          })

          setFilteredList(newList)
          setTicketsList(newList)
        })
        .catch((error) => console.error(error))
        .finally(() => {
          setConfirm(false)
          setLoading(false)
        })
    }, 1000)
  }

  const handleDelete = (id) => {
    deleteTicketHolder(id)
      .then(() => {
        toast.success('Tiquetera eliminada')
        const newList = ticketsList.filter((t) => t.id !== id)
        setFilteredList(newList)
        setTicketsList(newList)
      })
      .catch((error) => console.error(error))
  }

  if (loading) {
    return (
      <div className="h-screen flex flex-col gap-4 items-center justify-center">
        <HashLoader color="#00AAFF" />
        <p>Cargando la lista de tiqueteras...</p>
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
          {filteredList.length === 0 && <p className="text-center font-semibold text-lg">No hay tiqueteras disponibles 😶</p>}
          {filteredList.map((tk) => (
            <li className="border py-2 px-4" key={tk.id}>
              <TicketListCard handleDelete={handleDelete} handleTakeOff={handleTakeOff} {...tk} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
