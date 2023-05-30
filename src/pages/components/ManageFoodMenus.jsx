import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Producto 1', price: 10, provider: 'Proveedor A' },
    { id: 2, name: 'Producto 2', price: 20, provider: 'Proveedor B' },
    { id: 3, name: 'Producto 3', price: 30, provider: 'Proveedor C' },
  ]);

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [listName, setListName] = useState('Plaza');
  const [listId, setListId] = useState(12345);
  const [creationDate, setCreationDate] = useState('2023-06-01');

  const handleAddProduct = (product) => {
    const existingProduct = selectedProducts.find((p) => p.id === product.id);

    if (existingProduct) {
      toast.error('Este producto ya se encuentra en la lista');
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const handleRemoveProduct = (product) => {
    const updatedProducts = selectedProducts.filter((p) => p.id !== product.id);
    setSelectedProducts(updatedProducts);
  };

  return (
    <div className="h-screen justify-center items-center p-20">

      <div className="flex flex-col mb-8">
        <h2 className="text-4xl font-bold">{listName}</h2>
        <p className="text-gray-500">ID de la lista: {listId}</p>
        <p className="text-gray-500">Fecha de creación: {creationDate}</p>
      </div>

      <div className="flex flex-row justify-between mb-8">
        <h2 className="text-2xl font-bold">Productos Disponibles</h2>
        <h2 className="text-2xl font-bold">Productos Selecionados</h2>
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
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-4 py-2">{product.name}</td>
                  <td className="px-4 py-2">{product.price}</td>
                  <td className="px-4 py-2">{product.provider}</td>
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
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {selectedProducts.map((product) => (
                <tr key={product.id}>
                  <td className="px-4 py-2">{product.name}</td>
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
};

export default ProductList;
