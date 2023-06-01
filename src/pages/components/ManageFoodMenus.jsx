import React from 'react';
import { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
// Esto hice hoy
import { createList } from '@/services/endpoints'
import { getShoppingList, getIdProductList, getProductbyIds, getProvedorbyId, getAllProductsList, getAllProveedoresList } from '@/services/endpoints'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { getFirestore, doc, getDoc } from "firebase/firestore";



export default function ProductsManage() {
  const navigate = useNavigate()
  const { session } = useAuth()
  const [shoppingList, setShoppingList] = useState([])
  const [shoppingList2, setShoppingList2] = useState([{ idlista: 0, nombre_lista: 'Cargando...', fecha_lista: 'Cargando...', idusuario: session.idusuario }])
  const [idProductList, setIdProductList] = useState([])
  const [productos, setProductos] = useState([])
  const [allProductos, setAllProductos] = useState([])
  const [productos2, setProductos2] = useState([{ idproducto: 0, nombre_producto: 'Cargando...', precio: 0, idproveedor: 0 }])
  const [allProductos2, setAllProductos2] = useState([{ idproducto: 0, nombre_producto: 'Cargando...', precio: 0, idproveedor: 0 }])
  const [proveedores, setProveedores] = useState([])
  const [allIdProveedores, setAllIdProveedores] = useState([])
  const [allProveedores, setAllProveedores] = useState([])
  const [idProveedores, setIdProvedores] = useState([])
  const [productsOfList, setProductsOfList] = useState([{ idproducto: 0, nombre_producto: 'Cargando...', precio: 0, idproveedor: 0, nombre_proveedor: 'Cargando...' }])
  const [allProductsOfList, setAllProductsOfList] = useState([{ idproducto: 0, nombre_producto: 'Cargando...', precio: 0, idproveedor: 0, nombre_proveedor: 'Cargando...' }])
  const [filteredList, setFilteredList] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  // VARIABLES 
  const [idLi, setidLi] = useState([]); // id lista
  const [nombre_L, setnombre_L] = useState([]); // nombre lista
  const [fecha_cre, setfecha_cre] = useState([]); // fecha lista
  const [fechaFormateada, setfechaFormateada] = useState([]);
  const [nombre_pro, setnombre_pro] = useState([]); // nombre producto
  const [id_prove, setid_prove] = useState([]); // id provedor
  const [precio_pro, setprecio_pro] = useState([]); // precio
  const [id_pro, setid_pro] = useState([]); // id producto
  //const [idLista,setidLista] = useState(0);
  const [ban, setban] = useState(true);
  // console.log(nombre_pro,id_prove, precio_pro, id_pro)

  // OBTENER LISTA
  const { idlista } = useParams(); // id lista session.idusuario;
  //setidLista(parseInt(idlista.trim()));
  const idLista = parseInt(idlista.trim());
  const idUsuario = parseInt(session.idusuario);

  //console.log("id Lista : "+idLista+" - id Usuario: "+idUsuario);

  useEffect(() => {
    getShoppingList(idUsuario, idLista)
      .then((shoppingList) => {
        setShoppingList(shoppingList);
        //console.log("SSSSShoping 1:",shoppingList);
        setShoppingList2(shoppingList.map((obj) => {
          const fecha = new Date(obj.fecha_lista.seconds * 1000); // Multiplicamos por 1000 para convertir segundos a milisegundos
          const fechaLegible = fecha.toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });

          return {
            ...obj,
            fecha_lista: fechaLegible,
          };
        }));

        //console.log("SSSSShoping 2:", shoppingList2);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [idLista])



  // OBTENER ID PRODUCTOS DE LA LISTA
  useEffect(() => {
    getIdProductList(idLista)
      .then((idProductList) => {
        setIdProductList(idProductList);
        console.log("manage getIDProductList =>", idProductList);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [idLista])

  // OBTENER PRODUCTOS BY IdLISTA
  useEffect(() => {
    getProductbyIds(idProductList)
      .then((productos) => {
        setProductos2(productos.map((obj) => ({
          idproducto: obj.idproducto,
          nombre_producto: obj.nombre_producto,
          precio: obj.precio,
          idproveedor: obj.idproveedor,
        })));

        setIdProvedores(productos.map((obj) => ({
          idproveedor: obj.idproveedor,
        })));

        setProductos(productos);
        //console.log("manage getProductById =>", productos, idProveedores);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [idProductList]);


  // OBTENER PROVEEDORES DE CADA PRODUCTO
  useEffect(() => {
    if (true) {
      getProvedorbyId(idProveedores)
        .then((proveedores) => {
          setProductsOfList(productos2.map((obj2) => {
            const obj1 = proveedores.find((obj1) => obj1.idproveedor === obj2.idproveedor);
            if (obj1) {
              return {
                ...obj2,
                nombre_proveedor: obj1.nombre_proveedor,
              };
            }
            return obj2;
          }));

          console.log("New ARRRRAY Productos of list", productsOfList);
          setProveedores(proveedores);
          console.log("manage getProvedoresbyID: =>", proveedores);
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }
  }, [idProveedores])

  // OBTENER TODOS LOS PRODUCTOS
  useEffect(() => {
    getAllProductsList()
      .then((allProductos) => {
        setAllProductos2(allProductos.map((obj) => ({
          idproducto: obj.idproducto,
          nombre_producto: obj.nombre_producto,
          precio: obj.precio,
          idproveedor: obj.idproveedor,
        })));

        setAllIdProveedores(allProductos.map((obj) => ({
          idproveedor: obj.idproveedor
        })));

        setAllProductos(allProductos);
        console.log("manage getAllProductsList =>", allProductos2, "AllIdProvedores", allIdProveedores);
        console.log(productos2);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [idLista])

  // OBTENER TODOS LOS PROVEEDORES
  useEffect(() => {
    getAllProveedoresList()
      .then((allProveedores) => {

        setAllProductsOfList(allProductos2.map((obj2) => {
          const obj1 = allProveedores.find((obj1) => obj1.idproveedor == obj2.idproveedor);
          if (obj1) {
            return {
              ...obj2,
              nombre_proveedor: obj1.nombre_proveedor,
            };
          }
          return obj2;
        }));

        setAllProveedores(allProveedores);
        console.log("New ARRRRAY ALL productos", allProductsOfList);
        console.log("manage getAllProveedoresList =>", allProveedores);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [allIdProveedores])



  const [selectedProducts, setSelectedProducts] = useState([]);
  const [listName, setListName] = useState('Plaza');
  const listId = idlista;

  const handleAddProduct = (product) => { // Funcion de Añadir un producto
    const existingProduct = productsOfList.find((p) => p.idproducto === product.idproducto);

    if (existingProduct) {
      toast.error('Este producto ya se encuentra en la lista');
    } else {
      setProductsOfList([...productsOfList, product]);
    }
  };

  const handleRemoveProduct = (product) => { // Funcion de remover un producto
    const updatedProducts = productsOfList.filter((p) => p.idproducto !== product.idproducto);
    setProductsOfList(updatedProducts);
  };



  return (
    <div className="h-screen justify-center items-center p-20">



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
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Precio</th>
                <th className="px-4 py-2">Proveedor</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {allProductsOfList.map((product) => (
                <tr key={product.id}>
                  <td className="px-4 py-2">{product.nombre_producto}</td>
                  <td className="px-4 py-2">{product.precio}</td>
                  <td className="px-4 py-2">{product.nombre_proveedor}</td>
                  <td className="px-4 py-2">
                    <button className="bg-green-500 hover:bg-green-600 text-white rounded px-4 py-2" onClick={() => handleAddProduct(product)}>
                      Agregar
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
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Precio</th>
                <th className="px-4 py-2">Proveedor</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              
                {productsOfList.map((product) => (
                <tr key={product.id}>
                  <td className="px-4 py-2">{product.nombre_producto}</td>
                  <td className="px-4 py-2">{product.precio}</td>
                  <td className="px-4 py-2">{product.nombre_proveedor}</td>
                  <td className="px-4 py-2">
                    <button className="bg-red-500 text-white rounded px-4 py-2 ml-4 hover:bg-red-600" onClick={() => handleRemoveProduct(product)}>
                      Quitar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Link
        className=" flex  py-5 justify-center items-center"
        to={`/`}
      >
        <button className="px-8 py-2 bg-green-500 hover:bg-green-600 rounded-lg flex items-center">
          Volver
        </button>
      </Link>

      <ToastContainer style={{ marginTop: '20px' }} />
    </div>
  );
}