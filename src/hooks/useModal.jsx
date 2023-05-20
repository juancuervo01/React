import { useContext, createContext, useState, useMemo } from 'react'

const initialState = {
  modalView: '',
  displayModal: false,
  openModal: () => {},
  closeModal: () => {},
  setModalView: () => {}
}

const ModalContext = createContext(initialState)

export function ModalProvider(props) {
  const [modalView, setModalView] = useState(initialState.modalView)
  const [displayModal, setDisplayModal] = useState(initialState.displayModal)

  const openModal = () => {
    setDisplayModal(true)
  }

  const closeModal = () => {
    setDisplayModal(false)
  }

  const memoize = {
    modalView,
    displayModal,
    openModal,
    closeModal,
    setModalView
  }

  const value = useMemo(() => memoize, [modalView, displayModal])

  return <ModalContext.Provider value={value} {...props} />
}

export function useModal() {
  return useContext(ModalContext)
}
