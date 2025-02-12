import { useDeleteConversion } from '@/hooks/useDeleteConversation'
import { useGetConversions } from '@/hooks/useGetConversion'
import TrashIcon from '@/icons/TrashIcon'
import {
  Button,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from '@heroui/react'
import PopupModal from './PopupModal'

export default function ConversionTable() {
  const { data: conversions, isLoading, error } = useGetConversions()
  const { mutate: deleteConversion, isPending } = useDeleteConversion()
  const { onOpen, isOpen, onOpenChange } = useDisclosure()

  const handleDelete = (id: string) => {
    onOpen()
    deleteConversion(id)
  }

  if (isLoading)
    return <Spinner size="lg" color="primary" className="mx-auto my-10" />
  if (error)
    return (
      <p className="text-red-500 text-center">Failed to load conversions.</p>
    )

  return (
    <>
      <Table isStriped aria-label="Conversion History Table">
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>FROM</TableColumn>
          <TableColumn>TO</TableColumn>
          <TableColumn>AMOUNT</TableColumn>
          <TableColumn>RESULT</TableColumn>
          <TableColumn>DATE</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        <TableBody>
          {(conversions ?? []).map((conversion) => (
            <TableRow key={conversion.id}>
              <TableCell>{conversion.id}</TableCell>
              <TableCell>{conversion.fromCurrency}</TableCell>
              <TableCell>{conversion.toCurrency}</TableCell>
              <TableCell>{conversion.fromAmount}</TableCell>
              <TableCell>{conversion.toAmount}</TableCell>
              <TableCell>
                {new Date(conversion.date).toLocaleString()}
              </TableCell>
              <TableCell>
                <Button
                  isIconOnly
                  isLoading={isPending}
                  onPress={() => handleDelete(conversion.id)}
                >
                  <TrashIcon fill="red" stroke="white" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {isOpen && (
        <PopupModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          title="Delete Succesfully"
          content="Your conversion history has been deleted "
        />
      )}
    </>
  )
}
