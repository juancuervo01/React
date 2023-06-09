import { toast } from 'react-hot-toast'
import { useState } from 'react'
import { createList } from '@/services/endpoints'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import PropagateLoader from 'react-spinners/PropagateLoader'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { AiOutlinePlus } from 'react-icons/ai'

export default function AddListPage() {
  const [nameList, setNameList] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { session } = useAuth()

  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const errors = {}

    if (!nameList) {
      errors.nameList = 'El campo de nombre es requerido'
    } else if (!/^[a-zA-Z\sñÑ]+$/.test(nameList)) {
      errors.nameList = 'El campo de nombre solo puede contener letras'
    }

    return errors
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const formErrors = validateForm()

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      Object.values(formErrors).forEach((error) => {
        toast.error(error)
      })
      return
    }
    createList(nameList, session.idusuario)
      .then(() => {
        toast.success('Lista agregada exitosamente.')
        navigate('/')
      })
      .catch((error) => {
        toast.error('Error al agregar la lista.')
        console.error(error)
      })
      .finally(() => setLoading(false))
  }

  const Spinner = () => (
    <PropagateLoader
      cssOverride={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      color="#FFFFFF"
      className="h-6"
    />
  )

  const handleExit = () => {
    navigate('/')
  }

  return (
    <section className=" flex justify-center items-center p-2">
      <form className="flex flex-col gap-4 w-full max-w-md" onSubmit={onSubmit}>
        <h1 className="text-center text-lg mb-2">Agrega tu lista</h1>
        <Input
          required
          id="nombre_lista"
          name="nombre_lista"
          type="text"
          label="Nombre de la lista"
          placeholder="Lista de compras"
          value={nameList}
          onChange={(e) => setNameList(e.target.value)}
          error={errors.name}
        />
        <div className='flex  items-center justify-center'>
        <Button type="submit" disabled={loading}>
          <span className="flex items-center justify-center">
            {loading ? <Spinner /> : 'Añadir'}
            <AiOutlinePlus className="ml-1" size={30} />
          </span>
        </Button>
          <button
            onClick={handleExit}
            className="px-8 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 ml-12"
          >
            Salir
          </button>
        </div>
      </form>
    </section>

  )
}
