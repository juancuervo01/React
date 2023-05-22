import UserInfo from '@/components/common/UserInfo'
import logo from '@/assets/logo.png'

export default function Header() {
  return (
    <header className="flex gap-2 flex-wrap items-center justify-between p-4 bg-customColor">
      <img src={logo} width="200" height="100" />
      <UserInfo />
    </header>
  )
}
