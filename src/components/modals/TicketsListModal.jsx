import { useModal } from '@/hooks/useModal'
import { useTips } from '@/hooks/useTips'
import { Button } from '../ui'

export default function TicketsListModal() {
  const { changeTipsState } = useTips()
  const { closeModal } = useModal()

  const handleClose = () => {
    changeTipsState({ ticketsListInitial: false })
    closeModal()
  }

  return (
    <div className="flex flex-col gap-4 max-w-xs">
      <h2 className="text-center font-medium text-lg">Lista de tiqueteras</h2>
      <p>Aquí podrás ver las tiqueteras de tus clientes y anotar los almuerzos diarios 😎</p>
      <Button onClick={handleClose}>Entendido</Button>
    </div>
  )
}
