import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useState } from 'react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    toast.error('Servicio aún no implementado, disculpa las molestias')
  }

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
          placeholder="Elon musk"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          required
          id="email"
          name="email"
          type="email"
          label="Coreo"
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
        <Button type="submit">Registrate</Button>
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
