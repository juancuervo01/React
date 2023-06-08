import { getAllListProduct, deleteProduct, getAllProveedoresList, getAllProductsList } from '@/services/endpoints'
import { PageSpinner } from '@/components/spinners'
import { useEffect, useState } from 'react'
import ProductCard from '@/components/cards/ProductCard'
import Button2 from '@/components/ui/Button2'
import PropagateLoader from 'react-spinners/PropagateLoader'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { AiOutlinePlus } from 'react-icons/ai'

export default function HomePage() {
  const navigate = useNavigate()
  const [productList, setProductList] = useState([])
  const [filteredList, setFilteredList] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [, setProveedores] = useState([])
  const [, setListProduct] = useState([])
  const [productListConNombre, setproductListConNombre] = useState([])
  const [, setExisteProducto] = useState(false)

  useEffect(() => {
    getAllProductsList()
      .then((productList) => setProductList(productList))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    getAllProveedoresList() // veroficar si funciona
      .then((proveedores) => {
        setProveedores(proveedores)
        setproductListConNombre(productList.map((producto) => {
          const proveedor = proveedores.find((p) => p.idproveedor === producto.idproveedor)
          if (proveedor) {
            return {
              ...producto,
              nombre_proveedor: proveedor.nombre_proveedor
            }
          } else {
            return producto
          }
        }))
        // console.log('getProvedorbyId proveedores =>', proveedores)
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
  }, [productList])

  useEffect(() => {
    const results = productListConNombre.filter((item) => item.nombre_producto.trim().toLowerCase().includes(search.toLowerCase()))
    setFilteredList(results)
  }, [search, productList, productListConNombre])

  const Spinner = () => (
    <PropagateLoader
      cssOverride={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      color="#FFFFFF"
      className="h-6"
    />
  )

  const handleDelete = (idproducto) => {
    getAllListProduct()
      .then((listProduct) => {
        setListProduct(listProduct)
        console.log('list-product: ', listProduct, idproducto)

        const existeProducto = listProduct.some(objeto => objeto.idproducto === idproducto)
        console.log(existeProducto)

        if (existeProducto) {
          toast.error('¡No se puede eliminar este Producto!. Pertenece a una lista')
        } else {
          deleteProduct(idproducto)
            .then(() => {
              getAllProductsList()
                .then((productList) => {
                  setProductList(productList)
                  setFilteredList(productList)
                  toast.success('Producto eliminado correctamente')
                  setExisteProducto(false)
                })
                .catch((error) => console.error(error))
            })
            .catch((error) => console.error(error))
        }
      })
      .catch((error) => console.error(error))
  }

  if (loading) {
    return <PageSpinner text="Cargando Productos..." />
  }

  if (productList.length === 0) {
    return (
      <div className="bg-white flex flex-col items-center justify-center">
        <>
          <p className="text-center mt-12">
            ¡Agrega un primer producto! ! Haz click en Añadir Producto.
          </p>
          <Button2 type="submit" disabled={loading} onClick={() => navigate('/home-products')}>
            {loading ? <Spinner /> : 'Añadir Producto'}
            <AiOutlinePlus className="ml-1" size={30} />
          </Button2>
        </>
      </div>
    )
  }
  return (
    <div className="container mx-auto px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 p-4">
      <div className="flex flex-col gap-4">
        <div className="bg-white flex justify-center gap-10">
          <input
            className="border p-4 max-w-xl w-full"
            placeholder="Buscar por nombre del Producto"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button2 type="submit" disabled={loading} onClick={() => navigate('/AddProduct')}>
            <AiOutlinePlus className="ml-1" size={30} />
            {loading ? <Spinner /> : 'Añadir Producto'}
          </Button2>
        </div>
        <ul className="flex flex-col gap-4">
          {filteredList.map((r) => (
            <li className="border py-2 px-4" key={r.idproducto}>
              <ProductCard handleDelete={handleDelete}{...r} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
