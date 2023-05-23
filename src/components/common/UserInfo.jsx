import { useAuth } from '@/hooks/useAuth'

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
      <button className="bg-red-300 text-black p-2 rounded-lg" onClick={logout}>
        Cerrar sesión
      </button>
    </div>
  )
}
