import { ButtonSpinner } from '@/components/spinners'
import { FoodMenuCard } from '@/components/cards'
import { generateReserve, getFoodMenu, getReserve } from '@/services/endpoints'
import { HashLoader } from 'react-spinners'
import { toast } from 'react-hot-toast'
import { useAuth } from '@/hooks/useAuth'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import react from '@/assets/lunch.png'

export default function ReservePage() {
  const [foodMenu, setFoodMenu] = useState(undefined)
  const [loading, setLoading] = useState(true)
  const [loadingReserve, setLoadingReserve] = useState(true)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [reserve, setReserve] = useState()
  const [timestamp, setTimestamp] = useState('')
  const { session } = useAuth()
  const params = useParams()

  useEffect(() => {
    getReserve(session.id)
      .then((reserve) => {
        setReserve(reserve)
      })
      .catch((error) => console.error(error))
      .finally(() => setLoadingReserve(false))
  }, [])

  useEffect(() => {
    getFoodMenu(params.id)
      .then((foodMenu) => setFoodMenu(foodMenu))
      .catch((error) => toast.error(error.message))
      .finally(() => setLoading(false))
  }, [])

  const onSubmit = (e) => {
    e.preventDefault()

    const reserve = {
      name,
      phone,
      timestamp,
      foodMenu,
      id: session.id
    }

    setLoadingReserve(true)
    generateReserve(reserve)
      .then((reserve) => {
        toast.success('Reserva creada gracias por confiar en nosotros')
        setReserve(reserve)
      })
      .catch((error) => console.error(error))
      .finally(() => setLoadingReserve(false))
  }

  if (loading) {
    return (
      <div className="h-screen flex flex-col gap-4 items-center justify-center">
        <HashLoader color="#00AAFF" />
        <p>Cargando el menú...</p>
      </div>
    )
  }

  if (!foodMenu) {
    return (
      <div className="h-screen flex flex-col gap-4 items-center justify-center">
        <p>No existe el menú 😓</p>
      </div>
    )
  }

  if (reserve) {
    return (
      <div className="container mx-auto">
        <h1 className="text-center text-lg font-semibold my-8">Tu reserva</h1>
        <section className="flex flex-col gap-2">
          <p className="text-blue-500">Ya tienes una reserva creada</p>
          <p>
            Recuerda asistir a la hora de tu reserva <span className="text-blue-500">{reserve.timestamp}</span>
          </p>
          <p>Reservaste el menú</p>
          <FoodMenuCard showValues={false} {...reserve.foodMenu} />
        </section>
      </div>
    )
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-center my-8">Realiza tu reserva</h1>
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="flex flex-col bg-gray-100 gap-4">
          <div className="bg-cyan-500 text-white p-4 text-center">Almuerzo</div>
          <div className="flex items-center justify-center h-full">
            <img src={react} width="200" height="100" />
          </div>
          <div className="flex gap-1 bg-white text-center">
            <div className="border border-gray-300 flex-1 p-1">Precio ${foodMenu.price}</div>
            <div className="border border-gray-300 flex-1 p-1">{foodMenu.availables} disponibles</div>
          </div>
        </div>
        <div className="bg-cyan-500 p-4">
          <form className="flex flex-col gap-4 bg-white p-4" onSubmit={onSubmit}>
            <Input
              required
              id="phone"
              name="phone"
              type="text"
              label="Nombre"
              placeholder="Elon Musk"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              required
              id="phone"
              name="phone"
              type="number"
              label="Teléfono"
              placeholder="123456789"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <Input
              required
              id="timestamp"
              name="timestamp"
              type="time"
              label="Hora"
              placeholder="example@unicauca.edu.co"
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
            />
            <Button>{loadingReserve ? <ButtonSpinner /> : 'Reservar'}</Button>
          </form>
        </div>
      </section>
    </div>
  )
}
