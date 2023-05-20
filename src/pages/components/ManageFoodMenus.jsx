import { createFoodMenu, getAllFoodMenus } from '@/services/endpoints'
import { Cross } from '@/components/icons'
import { Select, Input, Button } from '@/components/ui'
import { ButtonSpinner } from '@/components/spinners'
import { toast } from 'react-hot-toast'
import { useState, useEffect } from 'react'
import FoodMenuListCard from '@/components/cards/FoodMenuListCard'
import FoodMenusPlaceholder from '@/components/placeholders/FoodMenusPlaceholder'
import { useTips } from '@/hooks/useTips'
import { modals } from '@/utils/modals'
import { useModal } from '@/hooks/useModal'

export default function ManageFoodMenusPage() {
  const [availables, setAvailables] = useState('')
  const [item, setItem] = useState('')
  const [items, setItems] = useState([])
  const [loadingCreate, setLoadingCreate] = useState(false)
  const [loadingFoodMenus, setLoadingFoodMenus] = useState(true)
  const [price, setPrice] = useState('')
  const [foodMenus, setFoodMenus] = useState([])
  const { manageFoodInitial } = useTips()

  const { setModalView, openModal } = useModal()

  useEffect(() => {
    if (manageFoodInitial) {
      setModalView(modals.manageFoodInitial)
      openModal()
    }
  }, [])

  useEffect(() => {
    getAllFoodMenus()
      .then((foodMenus) => {
        setFoodMenus(foodMenus)
      })
      .catch((error) => console.error(error.message))
      .finally(() => setLoadingFoodMenus(false))
  }, [])

  useEffect(() => {
    if (!item) return
    setItems((items) => items.concat([item]))
  }, [item])

  const onSubmit = (e) => {
    e.preventDefault()

    const foodMenu = {
      availables: Number(availables),
      created: Date.now(),
      isDaily: true,
      disabled: false,
      items,
      price: Number(price)
    }

    setLoadingCreate(true)
    createFoodMenu(foodMenu)
      .then((foodMenu) => {
        toast.success('Menú de comida creado')
        setFoodMenus((foodMenus) => foodMenus.concat([foodMenu]))
        clearAllFields()
      })
      .catch((error) => {
        toast.error('Ocurrió un error al crear el menú')
        console.error(error)
      })
      .finally(() => setLoadingCreate(false))
  }

  const clearAllFields = () => {
    setAvailables('')
    setItem('')
    setItems([])
    setPrice('')
  }

  const removeItem = (index) => {
    setItems((items) => items.filter((_, i) => i !== index))
  }

  return (
    <section className="container mx-auto px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 p-2 ">
      <h1 className="text-center my-8 font-semibold text-lg">Crear un menú de comida</h1>
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <Input
          id="price"
          label="Precio"
          name="price"
          onChange={(e) => setPrice(e.target.value)}
          placeholder="$12000"
          required
          type="number"
          value={price}
        />
        <Input
          id="availables"
          label="Disponibles"
          name="availables"
          onChange={(e) => setAvailables(e.target.value)}
          placeholder="1"
          required
          type="number"
          value={availables}
        />
        <Select id="item" label="Elementos" name="item" onChange={(e) => setItem(e.target.value)} required value={item}>
          <option value="" defaultValue hidden />
          <option value="Arroz">Arroz</option>
          <option value="Ensalada de frutas">Ensalada de frutas</option>
          <option value="Filete de cerdo">Filete de cerdo</option>
          <option value="Filete de pollo">Filete de pollo</option>
          <option value="Frijoles">Frijoles</option>
          <option value="Jugo de mora">Jugo de mora</option>
          <option value="Jugo de piña">Jugo de piña</option>
          <option value="Lentejas">Lentejas</option>
          <option value="platanitos">platanitos</option>
          <option value="Sancocho">Sancocho</option>
          <option value="Sopa de maiz">Sopa de maiz</option>
        </Select>
        <div>
          <ul className="flex gap-2 flex-wrap">
            {items.map((item, index) => (
              <li className="flex gap-2 bg-gray-200 px-1" key={`food-item-${index}`}>
                <p>{item}</p>
                <button type="button" onClick={() => removeItem(index)}>
                  <Cross />
                </button>
              </li>
            ))}
          </ul>
        </div>
        <Button type="submit" disabled={loadingCreate}>
          {loadingCreate ? <ButtonSpinner /> : 'Crear menú'}
        </Button>
      </form>
      <h2 className="text-center font-semibold text-lg my-8">Lista de menús de comida</h2>
      {loadingFoodMenus ? (
        <FoodMenusPlaceholder />
      ) : (
        <ul className="flex flex-col gap-4 ">
          {foodMenus.length === 0 && <p>No hay menús disponibles</p>}
          {foodMenus.map((tk) => (
            <li className="bg-white border p-2" key={`foodMenu-list-${tk.id}`}>
              <FoodMenuListCard {...tk} />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
