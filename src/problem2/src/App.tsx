import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Select,
  SelectItem,
  Spinner,
  useDisclosure,
} from '@heroui/react'
import { useState } from 'react'
import ConversionTable from './components/ConversionTable'
import PopupModal from './components/PopupModal'
import { useCreateConversion } from './hooks/useCreateConversion'
import useGetPrice from './hooks/useGetPrice'

export default function CurrencySwapForm() {
  const { data: prices, isLoading, error } = useGetPrice()
  const tokens = prices?.map((p) => p.currency) || []

  const [fromToken, setFromToken] = useState('ETH')
  const [toToken, setToToken] = useState('bNEO')
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [modalTitle, setModalTitle] = useState('')

  // Find price of the selected tokens
  const fromPrice = prices?.find((p) => p.currency === fromToken)?.price || 0
  const toPrice = prices?.find((p) => p.currency === toToken)?.price || 0

  // Calculate converted amount
  const convertedAmount =
    fromPrice && toPrice && amount
      ? (parseFloat(amount) * fromPrice) / toPrice
      : 0

  const { onOpen, isOpen, onOpenChange } = useDisclosure()

  const { mutate } = useCreateConversion() // Call the hook properly

  const handleSwap = () => {
    if (!amount || parseFloat(amount) <= 0) {
      setModalTitle('Error')
      setModalMessage('Invalid conversion. Enter a number greater than 0.')
      onOpen()
      return
    }
    mutate(
      {
        fromCurrency: fromToken,
        toCurrency: toToken,
        fromAmount: parseFloat(amount),
        toAmount: convertedAmount,
        createdAt: new Date().toISOString(),
      },
      {
        onSuccess: () => {
          setModalTitle('Success')
          setModalMessage(
            `Swapped ${amount} ${fromToken} → ${convertedAmount.toFixed(6)} ${toToken}`,
          )
          onOpen()
        },
        onError: (error) => {
          setModalTitle('Error')
          setModalMessage(error.message || 'An error occurred during the swap.')
          onOpen()
        },
        onSettled: () => setLoading(false),
      },
    )
    // setLoading(true)
    // setTimeout(() => {
    //   setLoading(false)
    // }, 2000)
  }

  if (isLoading)
    return (
      <div className="absolute inset-0 flex justify-center items-center">
        <Spinner size="lg" color="primary" />
      </div>
    )

  if (error) return <div className="text-red-500">Error fetching prices</div>

  return (
    <Card className="flex flex-col p-4 gap-4 max-w-4xl mx-auto mt-2 bg-primary-100 rounded-lg">
      <CardHeader className="text-2xl font-semibold text-center flex items-center  justify-center">
        <h1>Currency Swap</h1>
      </CardHeader>

      <CardBody className="flex flex-col gap-4">
        <label className="text-sm font-medium">From</label>
        <Select
          label="Choose currency you want to convert"
          selectedKeys={new Set(fromToken ? [fromToken] : [])} // ✅ Ensure a valid Set
          startContent={
            <img
              src={`../${fromToken}.svg`}
              alt={fromToken}
              className="w-4 h-4"
            />
          }
          onSelectionChange={(keys) => {
            const selectedValue = Array.from(keys)[0] as string
            setFromToken(selectedValue)
          }}
        >
          {tokens.map((token) => (
            <SelectItem
              key={token}
              value={token}
              startContent={
                <img src={`../${token}.svg`} alt={token} className="w-4 h-4" />
              }
            >
              {token}
            </SelectItem>
          ))}
        </Select>

        {/* Amount Input */}
        <Input
          label="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="mb-4"
        />

        {/* To Currency Selection */}
        <label className="text-sm font-medium">To</label>
        <Select
          label="Choose currency you want to convert to"
          selectedKeys={new Set([toToken])}
          startContent={
            <img src={`../${toToken}.svg`} alt={toToken} className="w-4 h-4" />
          }
          onSelectionChange={(keys) =>
            setToToken(Array.from(keys as Set<string>)[0])
          }
        >
          {tokens.map((token) => (
            <SelectItem
              key={token}
              value={token}
              startContent={
                <img src={`../${token}.svg`} alt={token} className="w-4 h-4" />
              }
            >
              {token}
            </SelectItem>
          ))}
        </Select>

        {/* Converted Amount */}
        <div className="mb-4 text-gray-600">
          Converted Amount:{' '}
          <span className="font-bold">
            {convertedAmount.toFixed(6)} {toToken}
          </span>
        </div>

        {/* Swap Button */}
        <Button
          color="primary"
          onPress={handleSwap}
          disabled={
            !amount || parseFloat(amount) <= 0 || !fromPrice || !toPrice
          }
          className="w-full"
        >
          {loading ? <Spinner size="md" color="white" /> : 'Swap'}
        </Button>

        {isOpen && (
          <PopupModal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            title={modalTitle}
            content={modalMessage}
          />
        )}
      </CardBody>
      <CardFooter>
        <ConversionTable />
      </CardFooter>
    </Card>
  )
}
