import React from 'react'
import { useTranslation } from 'react-i18next'
import { IModalProps } from '../../interfaces/ModalInterface'
import ReactModal from 'react-modal'
import { Container } from './Modal.styled'
import Button from '../Button/Button'

ReactModal.setAppElement('#modals')

const Modal = ({
    color,
    margin,
    customContent,
    onRequestClose,
    ...res
}: IModalProps) => {
    const { t } = useTranslation()
    return (
        <ReactModal
            style={{
                content: {
                    maxWidth: 450,
                    width: '100%',
                    top: '50%',
                    bottom: 'initial',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    padding: 0,
                    boxShadow: '4px 8px 14px 8px rgba(0, 0, 0, 0.45)',
                    border: '2px solid #BF5F26',
                    borderRadius: '16px',
                    background: color,
                },
                overlay: {
                    backgroundColor: 'rgba(255, 255, 255, 0.6)',
                    zIndex: 40,
                },
            }}
            onRequestClose={onRequestClose}
            {...res}
        >
            <Container margin={margin || '0'}>
                <>
                    {customContent}
                    <Button
                        text={t('buttons.close')}
                        onClick={onRequestClose}
                    />
                </>
            </Container>
        </ReactModal>
    )
}

export default Modal
