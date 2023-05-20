import { useModal } from '@/hooks/useModal'
import { useTips } from '@/hooks/useTips'
import { Button } from '../ui'

export default function ReserversListModal() {
  const { changeTipsState } = useTips()
  const { closeModal } = useModal()

  const handleClose = () => {
    changeTipsState({ reservesListInitial: false })
    closeModal()
  }

  return (
    <div className="flex flex-col gap-4 max-w-xs">
      <h2 className="text-center font-medium text-lg">Lista de reservas</h2>
      <p>Aquí podrás ver las reservas de tus clientes - Aún nos encontramos en desarrollo de esta sección -</p>
      <Button onClick={handleClose}>Entendido</Button>
    </div>
  )
}
