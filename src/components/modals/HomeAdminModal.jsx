import { useTips } from '@/hooks/useTips'
import { Button } from '@/components/ui'
import { useModal } from '@/hooks/useModal'

export default function HomeAdminModal() {
  const { changeTipsState } = useTips()
  const { closeModal } = useModal()

  const handleClose = () => {
    changeTipsState({ homeAdminInitial: false })
    closeModal()
  }

  return (
    <div className="flex flex-col gap-4 max-w-xs">
      <h2 className="text-center font-medium text-lg">
        Bienvenido administrador a <span className="text-blue-500">Unirestaurant</span>
      </h2>
      <p>Aquí podrás visualizar todos los menús que has creado 😊</p>
      <Button onClick={handleClose}>Entendido</Button>
    </div>
  )
}
