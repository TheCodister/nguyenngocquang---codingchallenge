import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@heroui/react'

interface PopupModalProps {
  isOpen: boolean
  title: string
  onOpenChange: (isOpen: boolean) => void
  content: string
}

export default function PopupModal({
  isOpen,
  title,
  onOpenChange,
  content,
}: PopupModalProps) {
  return (
    <Modal isOpen={isOpen} placement="top" onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>{title}</ModalHeader>
            <ModalBody>{content}</ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
