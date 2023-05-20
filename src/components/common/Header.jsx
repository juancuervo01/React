import UserInfo from '@/components/common/UserInfo'
import logo from '@/assets/logo.jpg'

export default function Header() {
  return (
    <header className="flex gap-2 flex-wrap items-center justify-between p-4 bg-blue-300">
      <img src={logo} width="200" height="100" />
      <UserInfo />
    </header>
  )
}
