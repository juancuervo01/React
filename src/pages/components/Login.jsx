import { Link } from 'react-router-dom'
import { loginWithUsernameAndPassword } from '@/services/endpoints'
import { toast } from 'react-hot-toast'
import { useAuth } from '@/hooks/useAuth'
import { useState } from 'react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import PropagateLoader from 'react-spinners/PropagateLoader'
import logo from '@/assets/sesion.png'

export default function LoginPage() {
  const { login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const errors = {}

    if (!username) {
      errors.username = 'El campo de usuario es requerido'
    } else if (username.length < 3 || username.length > 20) {
      errors.username = 'El usuario debe tener entre 3 y 20 caracteres'
    }

    if (!password) {
      errors.password = 'El campo de contraseña es requerido'
    } else if (password.length < 6 || password.length > 20) {
      errors.password = 'La contraseña debe tener entre 6 y 20 caracteres'
    }

    return errors
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const formErrors = validateForm()

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }
    setLoading(true)
    loginWithUsernameAndPassword({ username, password })
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
          id="username"
          name="username"
          type="username"
          label="Usuario"
          placeholder="Ingresa tu usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={errors.username}
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
          error={errors.password}
        />
        <Button type="submit" disabled={loading}>
          {loading ? <Spinner /> : 'Iniciar sesión'}
        </Button>
        <div className="mt-2">
          <p>
            ¿Aún no tienes cuenta?{' '}
            <Link to="/register" className="text-blue-600 hover:underline">
              Regístrate
            </Link>
          </p>
        </div>
      </form>
    </section>
  )
}
