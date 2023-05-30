/* eslint-disable camelcase */
import react from '@/assets/lista.png'
import { format } from 'date-fns'
import { useState } from 'react'
import SimpleSpinner from '../spinners/SimpleSpinner'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'

import { Link} from 'react-router-dom';
import React from 'react';

export default function ListCard({ idlista, nombre_lista, fecha_lista, count, handleTakeOff, handleDelete }) {
  const formattedDate = format(fecha_lista.toDate(), 'dd MMMM yyyy')
  const [confirm, setConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  count = 1
  const handleConfirm = () => {
    setLoading(true)
    handleTakeOff(idlista, { setLoading, setConfirm })
  }


  const handleCancel = () => {
    setConfirm(false)
  }

  return (
    <div className="flex justify-between bg-white">
      <div className="flex gap-4">
        <img src={react} width="100" height="60" />
        <div>
          <p>Nombre: {nombre_lista}</p>
          <p>Id: {idlista}</p>
          <p>Fecha de Creación: {formattedDate}</p>
        </div>
      </div>
      
      <Link
      
      className="bg-green-500 hover:bg-green-600 rounded-lg flex items-center"
      to={`/manage-food-menus/${idlista}`}
    >
      <button className="px-4 flex items-center">
        Editar Lista
        <AiOutlineEdit className="ml-1" size={30} />
      </button>
    </Link>

      {confirm ? (
        <div className="flex gap-2">
          <button
            disabled={loading}
            className="bg-green-500 hover:bg-green-600 active:bg-green-700 text-white px-2 py-1"
            onClick={handleConfirm}
          >
            {loading ? <SimpleSpinner /> : 'Confirmar'}
          </button>
          <button
            disabled={loading}
            className="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white px-2 py-1"
            onClick={handleCancel}
          >
            Cancelar
          </button>
        </div>
      ) : (
        <>
        {count >= 1 && (
          <button onClick={() => handleDelete(idlista)} className="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white px-2 py-1 rounded-lg flex items-center">
            Eliminar Lista
            <AiOutlineDelete className="ml-1" size={30}/>
          </button>
        )}
      </>

      )}
    </div>
  )
}
