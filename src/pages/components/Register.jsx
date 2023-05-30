import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { createUserWithUsernameAndPassword } from '@/services/endpoints'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import PropagateLoader from 'react-spinners/PropagateLoader'

export default function RegisterPage() {
  const { login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const errors = {}

    if (!name) {
      errors.name = 'El campo de usuario es requerido'
    }

    if (!username) {
      errors.username = 'El campo de usuario es requerido'
    } else if (username.length < 3 || username.length > 20) {
      errors.username = 'El usuario debe tener entre 3 y 20 caracteres'
    } else if (!/^[a-zA-Z0-9]+$/.test(username)) {
      errors.username = 'El usuario solo puede contener letras y números'
    }

    if (!password) {
      errors.password = 'El campo de contraseña es requerido'
    } else if (password.length < 6 || password.length > 20) {
      errors.password = 'La contraseña debe tener entre 6 y 20 caracteres'
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(password)) {
      errors.password = 'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y un carácter especial'
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
    createUserWithUsernameAndPassword({ name, username, password })
      .then((session) => {
        login(session)
        toast.success('Te has registrado exitosamente.')
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
        <h1 className="text-center text-lg mb-2">Registra tu cuenta</h1>
        <Input
          required
          id="name"
          name="name"
          type="text"
          label="Nombre"
          placeholder="Elon Musk"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
        />
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
          {loading ? <Spinner /> : 'Regístrate'}</Button>
        <div className="mt-2">
          <p>
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">
              Inicia sesión
            </Link>
          </p>
        </div>
      </form>
    </section>
  )
}
