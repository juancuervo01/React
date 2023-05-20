import { useAuth } from '@/hooks/useAuth'

export default function UserInfo() {
  const { session, logout } = useAuth()

  return (
    <div className="flex flex-wrap gap-4">
      <div>
        <p>
          Usuario: <span className="text-white">{session.name}</span>
        </p>
        <p>
          ID: <span className="text-white">{session.id}</span>
        </p>
      </div>
      <button className="bg-white p-2" onClick={logout}>
        Cerrar sesión
      </button>
    </div>
  )
}
