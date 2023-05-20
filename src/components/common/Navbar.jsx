import { useAuth } from '@/hooks/useAuth'
import NavButton from '@/components/common/NavButton'

export default function Navbar() {
  const { session } = useAuth()

  const NavOptionsUser = () => (
    <>
      <NavButton to="/">Menú del día</NavButton>
      <NavButton to="/purchases">Tiquetera</NavButton>
      <NavButton to="/information">Información</NavButton>
    </>
  )

  const NavOptionsAdmin = () => (
    <>
      <NavButton to="/">Menú del día</NavButton>
      <NavButton to="/manage-food-menus">Administrar menús</NavButton>
      <NavButton to="/tickets-list">Lista de tiqueteras</NavButton>
      <NavButton to="/reserve-list">Lista de reservas</NavButton>
    </>
  )

  return (
    <nav className="flex justify-around bg-slate-700 mt-1 p-2 sticky top-0">
      {session.role === 'user' && <NavOptionsUser />}
      {session.role === 'admin' && <NavOptionsAdmin />}
    </nav>
  )
}
