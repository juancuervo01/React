import { useEffect, useCallback, useRef } from 'react'
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import { Cross } from '@/components/icons'

export default function Modal({ children, onClose, isClosable }) {
  const ref = useRef()

  const handleKey = useCallback(
    (e) => {
      if (e.key === 'Escape' && isClosable) {
        return onClose()
      }
    },
    [onClose]
  )

  useEffect(() => {
    const modal = ref.current

    if (modal) {
      disableBodyScroll(modal, { reserveScrollBarGap: true })
      window.addEventListener('keydown', handleKey)
    }

    return () => {
      clearAllBodyScrollLocks()
      window.removeEventListener('keydown', handleKey)
    }
  }, [handleKey])

  return (
    <div className="bg-black/20 fixed inset-0 z-50 flex justify-center items-center">
      <div className="bg-white p-8 flex flex-col" role="dialog" ref={ref}>
        {isClosable ? (
          <div className="flex justify-end">
            <button onClick={onClose} aria-label="Close panel">
              <Cross />
            </button>
          </div>
        ) : null}
        <div className={isClosable ? 'px-4 pb-6' : 'px-0'}>{children}</div>
      </div>
    </div>
  )
}
