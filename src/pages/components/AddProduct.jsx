import { toast } from 'react-hot-toast'
import { useState, useEffect } from 'react'
import { createProduct, getAllProveedoresList } from '@/services/endpoints'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import PropagateLoader from 'react-spinners/PropagateLoader'
import { useNavigate } from 'react-router-dom'
import { AiOutlinePlus } from 'react-icons/ai'

export default function AddListPage() {
  const [nombre, setNombre] = useState('')
  const [precio, setPrecio] = useState()
  const [idProveedor, setIdProveedor] = useState(1)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [proveedores, setProveedores] = useState([])
  const [proveedor, setProveedor] = useState()

  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const errors = {}

    if (!nombre) {
      errors.nombre = 'El campo de nombre es requerido'
    } else if (!/^[a-zA-Z]+$/.test(nombre)) {
      errors.nombre = 'El campo de nombre solo puede contener letras'
    }

    if (!precio) {
      errors.precio = 'El campo de precio es requerido'
    } else if (precio.length < 3 || precio.length > 20) {
      errors.precio = 'El precio debe tener entre 3 y 20 digitos'
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
    createProduct(nombre, idProveedor, precio)
      .then(() => {
        toast.success('Producto agregado exitosamente.')
        navigate('/home-products')
      })
      .catch((error) => {
        toast.error('Error al agregar el Producto.')
        console.error(error)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    getAllProveedoresList()
      .then((proveedores) => {
        setProveedores(proveedores)
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
  }, [])

  const Spinner = () => (
    <PropagateLoader
      cssOverride={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      color="#FFFFFF"
      className="h-6"
    />
  )

  const handleInputChangeProveedor = (e) => {
    const nombreProveedorBuscado = e.target.value
    const objetoEncontrado = proveedores.find(objeto => objeto.nombre_proveedor === nombreProveedorBuscado)
    setProveedor(objetoEncontrado.nombre_proveedor)
    setIdProveedor(objetoEncontrado.idproveedor)
  }

  return (
    <section className="flex justify-center items-center p-2">
      <form className="flex flex-col gap-4 w-full max-w-md" onSubmit={onSubmit}>
        <h1 className="text-center text-lg mb-2">Agrega un Producto</h1>
        <Input
          id="nombre"
          name="nombre"
          type="text"
          label="Nombre del Producto"
          placeholder="Nombre del producto"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          error={errors.nombre}
        />
        <Input
          id="precio"
          name="precio"
          type="number"
          min="0"
          label="Precio del Producto"
          placeholder="5000"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          error={errors.precio}
        />
        <label htmlFor="proveedor" className="mr-2 text-gray-600">
          Proveedor:
        </label>
        <select
          id="proveedor"
          name="proveedor"
          value={proveedor}
          onChange={handleInputChangeProveedor}
        >
          {proveedores.map((prov) => (
            <option key={prov.nombre_proveedor} value={prov.nombre_proveedor}>
              {prov.nombre_proveedor}
            </option>
          ))}
        </select>
        <Button type="submit" disabled={loading}>
          <span className="flex items-center justify-center">
            {loading ? <Spinner /> : 'Añadir'}
            <AiOutlinePlus className="ml-1" size={30} />
          </span>
        </Button>
      </form>
    </section>

  )
}
