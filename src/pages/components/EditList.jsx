import React from 'react';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { createList } from '@/services/endpoints';
import { getShoppingList, updateList } from '@/services/endpoints';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

export default function EditList() {
    const navigate = useNavigate();
    const { session } = useAuth();
    const [shoppingList, setShoppingList] = useState([]);
    const [shoppingList2, setShoppingList2] = useState([{}]);
    const [nameLista, setnameLista] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    // OBTENER ID LISTA
    const { idlista } = useParams(); // id lista session.idusuario;
    const idLista = parseInt(idlista.trim());
    const idUsuario = parseInt(session.idusuario);

    useEffect(() => {
        getShoppingList(idUsuario, idLista)
            .then((shoppingList) => {
                setShoppingList(shoppingList);
                setnameLista(shoppingList[0].nombre_lista);
                setShoppingList2(
                    shoppingList.map((obj) => {
                        const fecha = new Date(obj.fecha_lista.seconds * 1000); // Multiplicamos por 1000 para convertir segundos a milisegundos
                        const fechaLegible = fecha.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
                        return {
                            ...obj,
                            fecha_lista: fechaLegible,
                        };
                    })
                );
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, [idlista, shoppingList2]);

    const [nombreLista, setNombreLista] = useState(shoppingList2[0].nombre_lista);

    const handleInputChange = (e) => {
        setNombreLista(e.target.value);
    };

    const handleSave = () => {
        if (nombreLista != '') {
            updateList(shoppingList[0].id, nombreLista)
                .then(() => {
                    toast.success('Lista editada correctamente');
                })
                .catch((error) => console.error(error));
        } else {
            toast.error('Nombre debe tener un valor');
        }
    };

    const handleExit = () => {
        navigate('/');
    };

    return (
        <div className="flex flex-col items-center justify-top h-screen mt-10">
            <h2 className="text-4xl font-bold mb-4">Editar Lista</h2>
            <div className="flex items-center mb-4">
                <label htmlFor="nombre" className="mr-2 text-gray-600">
                    Nombre:
                </label>
                <input
                    type="text"
                    id="nombre"
                    defaultValue={shoppingList2[0].nombre_lista}
                    onChange={handleInputChange}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
            </div>
            <p className="text-gray-600 mb-2">Fecha de Creación: {shoppingList2[0].fecha_lista}</p>
            <p className="text-gray-600 mb-2">ID de la Lista: {shoppingList2[0].idlista}</p>
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
    );
};
