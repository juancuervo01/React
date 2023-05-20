import { useTips } from '@/hooks/useTips'
import { Button } from '@/components/ui'
import { useModal } from '@/hooks/useModal'

export default function PurchasesModal() {
  const { changeTipsState } = useTips()
  const { closeModal } = useModal()

  const handleClose = () => {
    changeTipsState({ purchasesInitial: false })
    closeModal()
  }

  return (
    <div className="flex flex-col gap-4 max-w-xs">
      <h2 className="text-center font-medium text-lg">Tu página de tiquetera</h2>
      <p>Aquí podrás comprar tu tiquetera o revisar el estado de tus almuerzos 👌</p>
      <Button onClick={handleClose}>Entendido</Button>
    </div>
  )
}
