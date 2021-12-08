import { ReactNode } from 'react'
import ReactModal from 'react-modal'

interface Props {
  isModalOpen: boolean
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  children: ReactNode
}

export function Modal({ isModalOpen, setModalOpen, children }: Props) {
  return (
    <ReactModal
      shouldCloseOnOverlayClick={!false}
      onRequestClose={() => setModalOpen(false)}
      isOpen={isModalOpen}
      ariaHideApp={false}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          background: '#F0F0F5',
          color: '#000000',
          borderRadius: '8px',
          width: '736px',
          border: 'none',
        },
        overlay: {
          backgroundColor: '#121214e6',
        },
      }}
    >
      {children}
    </ReactModal>
  )
}