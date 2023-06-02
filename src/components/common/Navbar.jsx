import NavButton from '@/components/common/NavButton'

export default function Navbar() {
  const NavOptions = () => (
    <>
      <NavButton to="/">Listas de compras</NavButton>
      <NavButton to="/home-products">Lista de productos</NavButton>
      <NavButton to="/information">Información</NavButton>
    </>
  )

  return (
    <nav className="flex justify-around bg-slate-700 mt-1 p-2 sticky top-0">
      <NavOptions />
    </nav>
  )
}
