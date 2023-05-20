import { Link } from 'react-router-dom'
import { loginWithEmailAndPassword } from '@/services/endpoints'
import { toast } from 'react-hot-toast'
import { useAuth } from '@/hooks/useAuth'
import { useState } from 'react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import PropagateLoader from 'react-spinners/PropagateLoader'
import logo from '@/assets/logo.jpg'

export default function LoginPage() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    loginWithEmailAndPassword({ email, password })
      .then((session) => {
        login(session)
        toast.success('Inicio de sesión exitoso')
      })
      .catch((error) => {
        toast.error(error.message)
        console.error(error.message)
      })
      .finally(() => setLoading(false))
  }

  const Spinner = () => (
    <PropagateLoader
      cssOverride={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      color="#FFFFFF"
      className="h-6"
    />
  )

  return (
    <section className="h-screen flex justify-center items-center p-2">
      <form className="flex flex-col gap-4 w-full max-w-md" onSubmit={onSubmit}>
        <img className='m-auto mb-4' src={logo} width="250" height="100" />
        <Input
          required
          id="email"
          name="email"
          type="email"
          label="Correo"
          placeholder="example@unicauca.edu.co"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          required
          id="password"
          name="password"
          type="password"
          label="Contraseña"
          placeholder="***********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" disabled={loading}>
          {loading ? <Spinner /> : 'Iniciar sesión'}
        </Button>
        <div className="mt-2">
          <p>
            ¿Aún no tienes cuenta?{' '}
            <Link to="/register" className="text-blue-600 hover:underline">
              Registrate
            </Link>
          </p>
        </div>
      </form>
    </section>
  )
}
