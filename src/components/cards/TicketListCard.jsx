import { useState } from 'react'
import Button from '@/components/ui/Button'
import react from '@/assets/lunch.png'
import SimpleSpinner from '../spinners/SimpleSpinner'

export default function TicketListCard({ id, name, availables, handleTakeOff, handleDelete }) {
  const [confirm, setConfirm] = useState(false)
  const [loading, setLoading] = useState(false)

  return (
    <div className="flex justify-between bg-white">
      <div className="flex gap-4">
        <img src={react} width="50" height="50" />
        <div>
          <p>Nombre: {name}</p>
          <p>Id: {id}</p>
          <p>
            Almuerzos disponibles:{' '}
            <span
              className={`px-2 ${
                loading ? 'transition delay-300 duration-300 bg-red-500 text-white' : 'bg-transparent'
              }`}
            >
              {availables}
            </span>
          </p>
        </div>
      </div>
      {confirm ? (
        <div className="flex gap-2">
          <button
            disabled={loading}
            className="bg-green-500 hover:bg-green-600 active:bg-green-700 text-white px-2 py-1"
            onClick={() => handleTakeOff(id, { setLoading, setConfirm })}
          >
            {loading ? <SimpleSpinner /> : 'Confirmar'}
          </button>
          <button
            disabled={loading}
            className="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white px-2 py-1"
            onClick={() => setConfirm(false)}
          >
            Cancelar
          </button>
        </div>
      ) : (
        <>
          {availables <= 0 ? (
            <button
              onClick={() => handleDelete(id)}
              className="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white px-2 py-1"
            >
              Eliminar tiquetera
            </button>
          ) : (
            <Button onClick={() => setConfirm(true)}>Anotar uno</Button>
          )}
        </>
      )}
    </div>
  )
}
