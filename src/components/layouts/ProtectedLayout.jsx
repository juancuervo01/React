import { Footer, Header, Navbar } from '@/components/common'
import { Modal } from '@/components/ui'
import { modals } from '@/utils/modals'
import { Outlet } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { useModal } from '@/hooks/useModal'
import FallbackLoader from '@/components/FallbackLoader'
import ManageFoodsModal from '../modals/ManageFoodsModal'
import ReserversListModal from '../modals/ReserversListModal'
import TicketsListModal from '../modals/TicketsListModal'

const HomeUserModal = lazy(() => import('@/components/modals/HomeUserModal'))
const HomeAdminModal = lazy(() => import('@/components/modals/HomeAdminModal'))
const PurchasesModal = lazy(() => import('@/components/modals/PurchasesModal'))

export default function ProtectedLayout() {
  const ModalView = ({ modalView, closeModal }) => {
    const closableModals = {
      [modals.homeUserInitial]: false,
      [modals.homeAdminInitial]: false,
      [modals.purchasesInitial]: false,
      [modals.manageFoodInitial]: false,
      [modals.reservesListInitial]: false,
      [modals.ticketsListInitial]: false
    }

    const isClosable = closableModals[modalView]

    return (
      <Modal onClose={closeModal} isClosable={isClosable}>
        {modalView === modals.homeAdminInitial && <HomeAdminModal />}
        {modalView === modals.homeUserInitial && <HomeUserModal />}
        {modalView === modals.manageFoodInitial && <ManageFoodsModal />}
        {modalView === modals.purchasesInitial && <PurchasesModal />}
        {modalView === modals.reservesListInitial && <ReserversListModal />}
        {modalView === modals.ticketsListInitial && <TicketsListModal />}
      </Modal>
    )
  }

  const ModalUI = () => {
    const { displayModal, modalView, closeModal } = useModal()
    return displayModal ? <ModalView closeModal={closeModal} modalView={modalView} /> : null
  }

  return (
    <Suspense fallback={<FallbackLoader />}>
      <Header />
      <Navbar />
      <main className="min-h-screen bg-center bg-no-repeat bg-unicauca">
        <Outlet />
      </main>
      <Footer />
      <ModalUI />
    </Suspense>
  )
}
