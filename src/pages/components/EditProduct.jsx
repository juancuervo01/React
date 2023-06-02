import React from 'react'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { createList } from '@/services/endpoints'
import { getAllProveedoresList, updateProducto, updateList, getProduct, getProvedorbyId } from '@/services/endpoints'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { getFirestore, doc, getDoc } from 'firebase/firestore'

export default function EditList() {
  const navigate = useNavigate()
  const { session } = useAuth()
  const [producto, setProducto] = useState([])
  const [producto2, setProducto2] = useState([{}])
  const [proveedor, setProveedor] = useState([])
  const [proveedores, setProveedores] = useState([])
  const [proveedores2, setProveedores2] = useState([])
  const [allIdProveedores, setAllIdProveedores] = useState([{}])
  const [nameLista, setnameLista] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  // OBTENER ID LISTA
  const { idproducto } = useParams() // id lista session.idusuario;
  const idProducto = parseInt(idproducto.trim())
  const idUsuario = parseInt(session.idusuario)

  useEffect(() => {
    getProduct(idProducto)
      .then((producto) => {
        setProducto(producto)
        setnameLista(producto[0].nombre_producto)
        setProducto2(
          producto.map((obj) => {
            const fecha = new Date(obj.fecha_creacion.seconds * 1000) // Multiplicamos por 1000 para convertir segundos a milisegundos
            const fechaLegible = fecha.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
            return {
              ...obj,
              fecha_creacion: fechaLegible
            }
          })
        )
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
  }, [idProducto])

  useEffect(() => {
    getProvedorbyId([{ idproveedor: producto2[0].idproveedor }])
      .then((proveedor) => {
        setProveedor(proveedor)
        console.log('manage getProvedorbyId edirPROO =>', proveedor)
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
  }, [producto2])

  useEffect(() => {
    getAllProveedoresList()
      .then((proveedores) => {
        setProveedores(proveedores)
        const indiceObjetoBuscado = proveedores.findIndex((p) => p.idproveedor == proveedor[0].idproveedor)
        const proveedoresMapeados = [
          ...(indiceObjetoBuscado !== -1 ? [proveedores[indiceObjetoBuscado]] : []),
          ...proveedores.filter((p) => p.idproveedor !== proveedor[0].idproveedor)
        ]
        setProveedores2(proveedoresMapeados)
        console.log('manage getALLProvedoresList edirPROO mapeados =>', proveedores2)
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
  }, [producto2, proveedor])

  const [nombreProducto, setNombreProducto] = useState(producto2[0].nombre_producto)
  const [precioProducto, setPrecioProducto] = useState(producto2[0].precio)
  const [proveedorProducto, setProveedorProducto] = useState(proveedor.idproveedor)

  const handleInputChange = (e) => {
    setNombreProducto(e.target.value)
  }

  const handleSave = () => {
    if (nombreProducto != '' && precioProducto != '' && proveedorProducto != '') {
      updateProducto(producto[0].id, nombreProducto, precioProducto, proveedorProducto)
        .then(() => {
          toast.success('Producto editado correctamente')
        })
        .catch((error) => console.error(error))
    } else {
      toast.error('Todos los campos son obligatorios')
    }
  }

  const handleKeyDown = (event) => {
    const isNumberKey = /^[0-9]+$/.test(event.key)
    if (!isNumberKey) {
      event.preventDefault()
    }
  }

  const handleExit = () => {
    navigate('/edit-product')
  }

  return (
    <div className="flex flex-col items-center justify-top h-screen mt-10">
      <h2 className="text-4xl font-bold mb-4">Editar Producto</h2>
      <div className="flex items-center mb-4">
        <label htmlFor="nombre" className="mr-2 text-gray-600">
          Nombre:
        </label>
        <input
          type="text"
          id="nombre"
          defaultValue={producto2[0].nombre_producto}
          onChange={handleInputChange}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div className="flex items-center mb-4">
        <label htmlFor="precio" className="mr-2 text-gray-600">
          Precio:
        </label>
        <input
          type="text"
          id="precio"
          value={producto2[0].precio}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div className="flex items-center mb-4">
        <label htmlFor="proveedor" className="mr-2 text-gray-600">
          Proveedor:
        </label>
        <select
          id="proveedor"
          defaultValue={producto2[0].idproveedor}
          onChange={handleInputChange}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          {proveedores2.map((prov) => (
            <option key={prov.nombre_proveedor} value={prov.nombre_proveedor}>
              {prov.nombre_proveedor}
            </option>
          ))}
        </select>
      </div>
      <p className="text-gray-600 mb-2">Fecha de Creación: {producto2[0].fecha_creacion}</p>
      <p className="text-gray-600 mb-2">ID del producto: {producto2[0].idproducto}</p>
      <div className="mt-4">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Guardar
        </button>
        <button
          onClick={handleExit}
          className="px-8 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 ml-12"
        >
          Salir
        </button>
      </div>
    </div>
  )
}
