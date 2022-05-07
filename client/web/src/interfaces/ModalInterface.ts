import { ReactNode } from 'react'

export interface IModalProps {
    customContent: ReactNode
    isOpen: boolean
    onRequestClose: () => void
}
