import react from '@/assets/lunch.png'

export default function ReserveListCard({ id, name, timestamp }) {
  return (
    <div className="flex justify-between bg-white">
      <div className="flex gap-4">
        <img src={react} width="100" height="60" />
        <div>
          <p>Nombre: {name}</p>
          <p>Id: {id}</p>
          <p>Hora: {timestamp}</p>
        </div>
      </div>
      <button className="bg-gray-100 px-4">Funciones no disponibles</button>
    </div>
  )
}
