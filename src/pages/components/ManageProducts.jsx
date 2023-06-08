import { useEffect, useState, React } from 'react'
import { toast } from 'react-hot-toast'
import { Link, useParams } from 'react-router-dom'
import {
  deleteProductOfList,
  createProductOnList,
  getShoppingList,
  getIdProductList,
  getProductbyIds,
  getProvedorbyId,
  getAllProductsList,
  getAllProveedoresList
} from '@/services/endpoints'
import { useAuth } from '@/hooks/useAuth'
import { AiOutlinePlus, AiOutlineDelete } from 'react-icons/ai'

export default function ProductsManage() {
  const { session } = useAuth()
  const [, setShoppingList] = useState([])
  const [, setLoading] = useState(true)
  const [shoppingList2, setShoppingList2] = useState([
    { idlista: 0, nombre_lista: 'Cargando...', fecha_lista: 'Cargando...', idusuario: session.idusuario }
  ])
  const [idProductList, setIdProductList] = useState([])
  const [, setProductos] = useState([])
  const [, setAllProductos] = useState([])
  const [productos2, setProductos2] = useState([
    { idproducto: 0, nombre_producto: 'Cargando...', precio: 0, idproveedor: 0 }
  ])
  const [allProductos2, setAllProductos2] = useState([
    { idproducto: 0, nombre_producto: 'Cargando...', precio: 0, idproveedor: 0 }
  ])
  const [, setProveedores] = useState([])
  const [allIdProveedores, setAllIdProveedores] = useState([])
  const [, setAllProveedores] = useState([])
  const [idProveedores, setIdProvedores] = useState([])
  const [productsOfList, setProductsOfList] = useState([
    { idproducto: 0, nombre_producto: 'Cargando...', precio: 0, idproveedor: 0, nombre_proveedor: 'Cargando...' }
  ])
  const [allProductsOfList, setAllProductsOfList] = useState([
    { idproducto: 0, nombre_producto: 'Cargando...', precio: 0, idproveedor: 0, nombre_proveedor: 'Cargando...' }
  ])

  // OBTENER ID LISTA
  const { idlista } = useParams() // id lista session.idusuario;
  const idLista = parseInt(idlista.trim())
  const idUsuario = parseInt(session.idusuario)

  useEffect(() => {
    getShoppingList(idUsuario, idLista)
      .then((shoppingList) => {
        setShoppingList(shoppingList)
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
  }, [idLista])

  // OBTENER ID PRODUCTOS DE LA LISTA
  useEffect(() => {
    getIdProductList(idLista)
      .then((idProductList) => {
        setIdProductList(idProductList)
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
  }, [idLista])

  // OBTENER PRODUCTOS BY IdLISTA
  useEffect(() => {
    getProductbyIds(idProductList)
      .then((productos) => {
        setProductos2(
          productos.map((obj) => ({
            idproducto: obj.idproducto,
            nombre_producto: obj.nombre_producto,
            precio: obj.precio,
            idproveedor: obj.idproveedor
          }))
        )
        setIdProvedores(
          productos.map((obj) => ({
            idproveedor: obj.idproveedor
          }))
        )
        setProductos(productos)
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
  }, [idProductList])

  // OBTENER PROVEEDORES DE CADA PRODUCTO
  useEffect(() => {
    getProvedorbyId(idProveedores)
      .then((proveedores) => {
        setProductsOfList(
          productos2.map((obj2) => {
            const obj1 = proveedores.find((obj1) => obj1.idproveedor === obj2.idproveedor)
            if (obj1) {
              return {
                ...obj2,
                nombre_proveedor: obj1.nombre_proveedor
              }
            }
            return obj2
          })
        )
        setProveedores(proveedores)
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
  }, [idProveedores])

  // OBTENER TODOS LOS PRODUCTOS
  useEffect(() => {
    getAllProductsList()
      .then((allProductos) => {
        setAllProductos2(
          allProductos.map((obj) => ({
            idproducto: obj.idproducto,
            nombre_producto: obj.nombre_producto,
            precio: obj.precio,
            idproveedor: obj.idproveedor
          }))
        )

        setAllIdProveedores(
          allProductos.map((obj) => ({
            idproveedor: obj.idproveedor
          }))
        )
        setAllProductos(allProductos)
        console.log('manage getAllProductsList =>', allProductos2, 'AllIdProvedores', allIdProveedores)
        console.log(productos2)
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
  }, [idLista])

  // OBTENER TODOS LOS PROVEEDORES
  useEffect(() => {
    getAllProveedoresList()
      .then((allProveedores) => {
        setAllProductsOfList(
          allProductos2.map((obj2) => {
            const obj1 = allProveedores.find((obj1) => obj1.idproveedor === obj2.idproveedor)
            if (obj1) {
              return {
                ...obj2,
                nombre_proveedor: obj1.nombre_proveedor
              }
            }
            return obj2
          })
        )
        setAllProveedores(allProveedores)
        console.log('New ARRRRAY ALL productos', allProductsOfList)
        console.log('manage getAllProveedoresList =>', allProveedores)
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
  }, [allIdProveedores])

  const handleAddProduct = (product) => {
    // Funcion de Añadir un producto
    const existingProduct = productsOfList.find((p) => p.idproducto === product.idproducto)
    if (existingProduct) {
      toast.error('Este producto ya se encuentra en la lista')
    } else {
      createProductOnList(product.idproducto, idLista) // Llamo la funcion para agregar el producto a la lista en firebase
        .then(() => {
          toast.success('Producto agregado exitosamente.')
          setProductsOfList([...productsOfList, product]) // agrega el producto a la lista local
        })
        .catch((error) => {
          toast.error('Error al agregar el producto.')
          console.error(error)
        })
        .finally(() => setLoading(false))
    }
  }

  const handleRemoveProduct = (product) => {
    // Funcion de remover un producto
    deleteProductOfList(product.idproducto, idLista)
      .then(() => {
        const updatedProducts = productsOfList.filter((p) => p.idproducto !== product.idproducto)
        setProductsOfList(updatedProducts)
        toast.success('Producto eliminado.')
      })
      .catch((error) => {
        console.error(error)
        toast.error('Error al Quitar el producto.')
      })
  }

  return (
    <div className="justify-center items-center p-20">
      <div className="flex flex-col mb-8">
        <h2 className="text-4xl font-bold">{shoppingList2[0].nombre_lista}</h2>
        <p className="text-gray-500">ID de la lista: {shoppingList2[0].idlista}</p>
        <p className="text-gray-500">Fecha de creación: {shoppingList2[0].fecha_lista}</p>
      </div>

      <div className="flex flex-row justify-between mb-8">
        <h2 className="text-2xl font-bold">Productos Disponibles</h2>
        <h2 className="text-2xl font-bold">Productos de la Lista</h2>
      </div>

      <div className="flex flex-row justify-between">
        <div>
          <table>
            <thead>
              <tr>
              <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Precio</th>
                <th className="px-4 py-2">Proveedor</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>

            <tbody>
              {allProductsOfList.map((product) => (
                <tr key={product.id}>
                  <td className="px-4 py-2">{product.idproducto}</td>
                  <td className="px-4 py-2">{product.nombre_producto}</td>
                  <td className="px-4 py-2">{product.precio}</td>
                  <td className="px-4 py-2">{product.nombre_proveedor}</td>
                  <td className="px-4 py-2">
                    <button onClick={() => handleAddProduct(product)} className=" text-white bg-green-500 hover:bg-green-600 active:bg-green-700 px-2 py-1 rounded-lg flex items-center">
                      Agregar
                      <AiOutlinePlus className="ml-1" size={30} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <table>
            <thead>
              <tr>
              <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Precio</th>
                <th className="px-4 py-2">Proveedor</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {productsOfList.map((product) => (
                <tr key={product.id}>
                  <td className="px-4 py-2">{product.idproducto}</td>
                  <td className="px-4 py-2">{product.nombre_producto}</td>
                  <td className="px-4 py-2">{product.precio}</td>
                  <td className="px-4 py-2">{product.nombre_proveedor}</td>
                  <td className="px-4 py-2">
                    <button onClick={() => handleRemoveProduct(product)} className="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white px-2 py-1 rounded-lg flex items-center">
                      Quitar
                      <AiOutlineDelete className="ml-1" size={30} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Link className=" flex  mt-12 justify-center items-center" to={'/'}>
        <button className="px-8 py-2 bg-gray-400 hover:bg-gray-500 rounded-lg flex items-center">Volver</button>
      </Link>
    </div>
  )
}
