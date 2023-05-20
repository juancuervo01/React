import { useModal } from '@/hooks/useModal'
import { useTips } from '@/hooks/useTips'
import { Button } from '../ui'

export default function ManageFoodsModal() {
  const { changeTipsState } = useTips()
  const { closeModal } = useModal()

  const handleClose = () => {
    changeTipsState({ manageFoodInitial: false })
    closeModal()
  }

  return (
    <div className="flex flex-col gap-4 max-w-xs">
      <h2 className="text-center font-medium text-lg">Administrar menús de comida</h2>
      <p>Aquí podrás crear un nuevo menú de comida o administrarlos 🔧</p>
      <Button onClick={handleClose}>Entendido</Button>
    </div>
  )
}
