import React from 'react'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { createList } from '@/services/endpoints'
import { getShoppingList, updateList } from '@/services/endpoints'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { AiOutlineEdit, AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai'
import PropagateLoader from 'react-spinners/PropagateLoader'

export default function EditList() {
  const navigate = useNavigate()
  const { session } = useAuth()
  const [shoppingList, setShoppingList] = useState([])
  const [shoppingList2, setShoppingList2] = useState([{}])
  const [nameLista, setnameLista] = useState()
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [nombreLista, setNombreLista] = useState()
  // OBTENER ID LISTA
  const { idlista } = useParams() // id lista session.idusuario;
  const idLista = parseInt(idlista.trim())
  const idUsuario = parseInt(session.idusuario)

  useEffect(() => {
    getShoppingList(idUsuario, idLista)
      .then((shoppingList) => {
        setShoppingList(shoppingList)
        setnameLista(shoppingList[0].nombre_lista)
        setShoppingList2(
          shoppingList.map((obj) => {
            const fecha = new Date(obj.fecha_lista.seconds * 1000) // Multiplicamos por 1000 para convertir segundos a milisegundos
            const fechaLegible = fecha.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
            return {
              ...obj,
              fecha_lista: fechaLegible
            }
          })
        )
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
  }, [idlista, shoppingList2])

  useEffect(() => {
    setNombreLista(nameLista)
  }, [nameLista])

  const handleInputChange = (e) => {
    setNombreLista(e.target.value)
  }

  const handleExit = () => {
    navigate('/')
  }

  const Spinner = () => (
    <PropagateLoader
      cssOverride={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      color="#FFFFFF"
      className="h-6"
    />
  )

  const onSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    if (nombreLista != undefined && nombreLista != shoppingList[0].nombre_lista) {
      console.log(nombreLista)
      updateList(shoppingList[0].id, nombreLista)
        .then(() => {
          toast.success('Lista editada correctamente')
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false))
    } else {
      toast.error('No se han realizado cambios')
    }
  }

  return (
    <div className="flex flex-col items-center justify-top  mt-10">
      <form className="flex flex-col gap-4 w-full max-w-md" onSubmit={onSubmit}>
        <h2 className="text-4xl font-bold mb-4">Editar Lista</h2>
        <div className="flex items-center">
          <Input
            required
            id="nombre"
            name="nombre"
            type="text"
            label="Nombre de la Lista:"
            placeholder="Nombre de la lista"
            value={nombreLista}
            onChange={handleInputChange}
          />
        </div>
        <p className="text-gray-600">Fecha de Creación: {shoppingList2[0].fecha_lista}</p>
        <p className="text-gray-600">ID de la Lista: {shoppingList2[0].idlista}</p>
        <div className="mt-4">
          <Button type="submit" disabled={loading}>
            <span className="flex items-center justify-center">
              {loading ? <Spinner /> : 'Editar'}
              <AiOutlineEdit className="ml-1" size={30} />
            </span>
          </Button>
          <button
            onClick={handleExit}
            className="px-8 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 ml-12"
          >
            Salir
          </button>
        </div>
      </form>
    </div>
  )
}
