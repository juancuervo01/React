import { ButtonSpinner, PageSpinner } from '@/components/spinners'
import { getSettings, getTicketHolder, payTicketHolder } from '@/services/endpoints'
import { modals } from '@/utils/modals'
import { Select, Button, Input } from '@/components/ui'
import { toast } from 'react-hot-toast'
import { useAuth } from '@/hooks/useAuth'
import { useEffect, useState } from 'react'
import { useModal } from '@/hooks/useModal'
import { useTips } from '@/hooks/useTips'
import react from '@/assets/lunch.png'
import { generateDataTable } from '@/lib/generate'

export default function PurchasesPage() {
  const { session } = useAuth()
  const [complete, setComplete] = useState(undefined)
  const [half, setHalf] = useState(undefined)
  const [loading, setLoading] = useState(false)
  const [loadingTicket, setLoadingTicket] = useState(true)
  const [name, setName] = useState(session.name)
  const [phone, setPhone] = useState('')
  const [size, setSize] = useState(30)
  const { purchasesInitial } = useTips()
  const { setModalView, openModal } = useModal()
  const [ticketHolder, setTicketHolder] = useState(undefined)
  const [dataTable, setDataTable] = useState([])

  useEffect(() => {
    if (purchasesInitial) {
      setModalView(modals.purchasesInitial)
      openModal()
    }
  }, [])

  useEffect(() => {
    getTicketHolder(session.id)
      .then((ticketHolder) => {
        setTicketHolder(ticketHolder)
        if (!ticketHolder) return
        const dataTable = generateDataTable({ size: ticketHolder.size, availables: ticketHolder.availables })
        setDataTable(dataTable)
      })
      .catch((error) => console.error(error))
      .finally(() => setLoadingTicket(false))
  }, [])

  const update = () => {
    setLoadingTicket(true)
    getTicketHolder(session.id)
      .then((ticketHolder) => {
        setTicketHolder(ticketHolder)
        if (!ticketHolder) return
        const dataTable = generateDataTable({ size: ticketHolder.size, availables: ticketHolder.availables })
        setDataTable(dataTable)
      })
      .catch((error) => console.error(error))
      .finally(() => setLoadingTicket(false))
  }

  useEffect(() => {
    getSettings()
      .then((settings) => {
        setHalf(settings.half)
        setComplete(settings.complete)
      })
      .catch((error) => console.error(error))
  }, [])

  const clearAllField = () => {
    setName('')
    setPhone('')
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const ticketHolder = {
      availables: Number(size),
      id: session.id,
      name,
      phone,
      size: Number(size)
    }

    setLoading(true)
    payTicketHolder(ticketHolder)
      .then((ticketHolder) => {
        toast.success('Gracias por comprar una tiquetera con nosotros 😊')
        setTicketHolder(ticketHolder)
        const dataTable = generateDataTable({ size: ticketHolder.size, availables: ticketHolder.availables })
        setDataTable(dataTable)
        clearAllField()
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
  }

  if (loadingTicket) {
    return <PageSpinner text="Cargando tiquetera..." />
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-lg font-semibold my-6">Tú tiquetera</h1>
      {ticketHolder ? (
        <>
          <div className="flex justify-between mb-2">
            <div className="">
              <div className="flex items-center gap-2">
                Disponible <div className="bg-green-400 w-3 h-3 rounded-full" />
              </div>
              <div className="flex items-center gap-2">
                No disponible <div className="bg-red-400 w-3 h-3 rounded-full" />
              </div>
            </div>
            <button className="border px-4" onClick={update}>
              Actualizar 🔃
            </button>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {dataTable.map((t) => {
              const bg = t.free ? 'bg-green-400' : 'bg-red-400'
              return (
                <div key={`table-day-${t.id}`} className={`border p-2 ${bg}`}>
                  <p>{t.day}</p>
                </div>
              )
            })}
          </div>
        </>
      ) : (
        <p>No tienes una tiquetera comprada 😶</p>
      )}
      <h2 className="text-center text-lg font-semibold my-6">Compra tu tiquetera</h2>
      {ticketHolder ? (
        <p>Ya tienes una tiquetera comprada, gracias por confiar en nosotros ❤️</p>
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="flex flex-col bg-gray-100 gap-4">
            <div className="bg-cyan-500 text-white p-4 text-center">Tiquetera</div>
            <div className="flex items-center justify-center h-full">
              <img src={react} width="300" height="300" />
            </div>
            <div className="gap-1 bg-white text-center">
              <div className="border border-gray-300 text-gray-500 p-1">
                15 Almuerzos <span className="text-black">${half}</span>
              </div>
              <div className="border border-gray-300  text-gray-500 p-1">
                30 Almuerzos <span className="text-black">${complete}</span>
              </div>
            </div>
          </div>
          <div className="bg-cyan-500 p-4">
            <form className="flex flex-col gap-4 bg-white p-4" onSubmit={onSubmit}>
              <Input
                id="name"
                label="Nombre"
                name="name"
                onChange={(e) => setName(e.target.value)}
                placeholder="Tú nombre"
                required
                type="text"
                value={name}
              />
              <Input
                id="phone"
                label="Teléfono"
                name="phone"
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Tú teléfono"
                required
                type="number"
                value={phone}
              />
              <Select
                id="size"
                itemType="number"
                label="Cantidad de almuerzos"
                name="size"
                onChange={(e) => setSize(e.target.value)}
                required
                value={size}
              >
                <option value={15}>15 Almuerzos</option>
                <option value={30} defaultValue>
                  30 Almuerzos
                </option>
              </Select>
              <Button>{loading ? <ButtonSpinner /> : 'Comprar'}</Button>
            </form>
          </div>
        </section>
      )}
    </div>
  )
}
