import { useAuth } from '@/hooks/useAuth'
import { AiOutlineLogout } from 'react-icons/ai'

export default function UserInfo() {
  const { session, logout } = useAuth()
  return (
    <div className="flex flex-wrap gap-4 bg-customColor text-black p-4">
      <div>
        <p className="text-lg font-semibold">
          Usuario: <span className="text-black">{session.username}</span>
        </p>
        <p className="text-lg font-semibold">
          Nombre: <span className="text-black">{session.nombre_usuario}</span>
        </p>
        <p className="text-sm">
          ID: <span className="text-black">{session.idusuario}</span>
        </p>
      </div>
      <button className="bg-red-500 hover:bg-red-600 active:bg-red-700 rounded-lg text-white p-2 rounded-lg flex flex-row-reverse items-center" onClick={logout}>
        <AiOutlineLogout className="ml-1" size={30}/>
        Cerrar sesión
      </button>

    </div>
  )
}
