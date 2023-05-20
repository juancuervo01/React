import { useLocation, Link } from 'react-router-dom'

export default function NavButton(props) {
  const location = useLocation()
  const active = location.pathname === props.to

  return (
    <Link
      to={props.to}
      className={`border px-4 py-1
      ${active ? 'bg-white' : 'bg-slate-700'} hover:bg-white
      ${active ? 'text-slate-700' : 'text-white'} hover:text-slate-700`}
      {...props}
    />
  )
}
