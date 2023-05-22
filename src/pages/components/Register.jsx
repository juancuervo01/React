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

  const onSubmit = (e) => {
    e.preventDefault()
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
