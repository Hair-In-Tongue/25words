import { ReactNode } from 'react'

export interface IModalProps {
    color: string
    margin?: string
    customContent: ReactNode
    isOpen: boolean
    onRequestClose: () => void
}
