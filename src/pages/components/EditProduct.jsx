import { useEffect, useState, React } from 'react'
import { toast } from 'react-hot-toast'
import { getAllProveedoresList, updateProducto, getProduct, getProvedorbyId } from '@/services/endpoints'
import { useNavigate, useParams } from 'react-router-dom'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { AiOutlinePlus } from 'react-icons/ai'
import PropagateLoader from 'react-spinners/PropagateLoader'

export default function EditList() {
  const navigate = useNavigate()
  const [producto, setProducto] = useState([])
  const [producto2, setProducto2] = useState([{}])
  const [proveedor, setProveedor] = useState()
  const [, setProveedores] = useState([])
  const [proveedores2, setProveedores2] = useState([])
  const [loading, setLoading] = useState(true)
  const [nombreProducto, setNombreProducto] = useState()
  const [precioProducto, setPrecioProducto] = useState()
  const [proveedorProducto, setProveedorProducto] = useState()
  const [idProveedorProducto, setIdProveedorProducto] = useState()

  // OBTENER ID LISTA
  const { idproducto } = useParams() // id lista session.idusuario;
  const idProducto = parseInt(idproducto.trim())

  useEffect(() => {
    getProduct(idProducto)
      .then((producto) => {
        setProducto(producto)
        const productoTransformado = producto.map((obj) => {
          const fecha = new Date(obj.fecha_creacion.seconds * 1000)
          const fechaLegible = fecha.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
          return {
            ...obj,
            fecha_creacion: fechaLegible
          }
        })
        setProducto2(productoTransformado)
        console.log('producto producto2 =>', producto, productoTransformado)
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
  }, [idProducto])

  useEffect(() => {
    getProvedorbyId([{ idproveedor: producto2[0].idproveedor }])
      .then((proveedor) => {
        setProveedor(proveedor)
        console.log('getProvedorbyId proveedor =>', proveedor)
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
  }, [producto2])

  useEffect(() => {
    getAllProveedoresList()
      .then((proveedores) => {
        setProveedores(proveedores)
        const proveedorId = producto2[0].idproveedor
        setProveedores2([
          ...proveedores.filter((p) => p.idproveedor === proveedorId),
          ...proveedores.filter((p) => p.idproveedor !== proveedorId)
        ])
        console.log('getALLProvedoresList proveedores mapeados (proveedores2) =>', proveedores2)
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
  }, [proveedor, producto2, producto])

  useEffect(() => {
    setNombreProducto(producto2[0].nombre_producto)
    setPrecioProducto(producto2[0].precio)
    setIdProveedorProducto(producto2[0].idproveedor)
  }, [producto2])

  const handleInputChangeNombre = (e) => {
    setNombreProducto(e.target.value)
  }
  const handleInputChangePrecio = (e) => {
    setPrecioProducto(e.target.value)
  }
  const handleInputChangeProveedor = (e) => {
    const nombreProveedorBuscado = e.target.value
    const objetoEncontrado = proveedores2.find(objeto => objeto.nombre_proveedor === nombreProveedorBuscado)
    setIdProveedorProducto(objetoEncontrado.idproveedor)
    setProveedorProducto(objetoEncontrado.nombre_proveedor)
  }

  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const errors = {}

    if (!nombreProducto) {
      errors.nombreProducto = 'El campo de nombre es requerido'
    } else if (!/^[a-zA-Z]+$/.test(nombreProducto)) {
      errors.nombreProducto = 'El campo de nombre solo puede contener letras'
    }

    if (!precioProducto) {
      errors.precioProducto = 'El campo de precio es requerido'
    } else if (precioProducto.length < 3 || precioProducto.length > 20) {
      errors.precioProducto = 'El precio debe tener entre 3 y 20 digitos'
    }

    return errors
  }

  const onSubmit = (e) => {
    if (nombreProducto === producto2[0].nombre_producto && precioProducto === producto2[0].precio && idProveedorProducto === producto2[0].idproveedor) {
      e.preventDefault()
      toast.error('No se ha realizado cambios')
      setLoading(false)
    } else {
      e.preventDefault()
      const formErrors = validateForm()

      if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors)
        Object.values(formErrors).forEach((error) => {
          toast.error(error)
        })
        return
      }
      setLoading(true)
      updateProducto(producto2[0].id, nombreProducto, precioProducto, idProveedorProducto)
        .then(() => {
          toast.success('Producto editado correctamente')
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false))
    }
  }

  const Spinner = () => (
    <PropagateLoader
      cssOverride={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      color="#FFFFFF"
      className="h-6"
    />
  )

  const handleExit = () => {
    navigate('/home-products')
  }

  return (
    <div className="flex flex-col items-center justify-top mt-10">
      <form className="flex flex-col gap-4 w-full max-w-md" onSubmit={onSubmit}>
        <h2 className="text-4xl font-bold mb-4">Editar Producto</h2>
        <Input
          id="nombre"
          name="nombre"
          type="text"
          label="Nombre del Producto:"
          placeholder="Nombre del producto"
          value={nombreProducto}
          onChange={handleInputChangeNombre}
          error={errors.nombreProducto}
        />
        <Input
          id="precio"
          name="precio"
          type="number"
          min="0"
          label="Precio del Producto:"
          placeholder="5000"
          value={precioProducto}
          onChange={handleInputChangePrecio}
          error={errors.precioProducto}
        />
        <label htmlFor="proveedor">
          Proveedor:
        </label>
        <select
          value={proveedorProducto}
          label="Proveedor del Producto:"
          id="proveedor"
          onChange={handleInputChangeProveedor}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          {proveedores2.map((prov) => (
            <option key={prov.nombre_proveedor} value={prov.nombre_proveedor}>
              {prov.nombre_proveedor}
            </option>
          ))}
        </select>
        <p>Fecha de Creacion: {producto2[0].fecha_creacion}</p>
        <p>ID del Producto: {producto2[0].idproducto}</p>

        <div className="mt-1 flex justify-center">
          <Button type="submit" disabled={loading}>
            <span className="flex items-center justify-center">
              {loading ? <Spinner /> : 'Editar'}
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
    </div>
  )
}
