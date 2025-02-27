import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Spinner,
  useDisclosure,
} from '@heroui/react'
import { useCallback, useMemo, useState } from 'react'
import ConversionTable from './components/ConversionTable'
import CurrencySelect from './components/CurrencySelect'
import PopupModal from './components/PopupModal'
import { useCreateConversion } from './hooks/useCreateConversion'
import useGetPrice from './hooks/useGetPrice'
import { calculateConvertedAmount, findPrice } from './utils/conversion'

export default function CurrencySwapForm() {
  const { data: prices, isLoading, error } = useGetPrice()
  const tokens = prices?.map((p) => p.currency) || []

  const [fromToken, setFromToken] = useState('ETH')
  const [toToken, setToToken] = useState('bNEO')
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [modalTitle, setModalTitle] = useState('')

  const fromPrice = useMemo(
    () => findPrice(prices ?? [], fromToken),
    [prices, fromToken],
  )

  const toPrice = useMemo(
    () => findPrice(prices ?? [], toToken),
    [prices, toToken],
  )

  const convertedAmount = useMemo(
    () => calculateConvertedAmount(amount, fromPrice, toPrice),
    [amount, fromPrice, toPrice],
  )

  const { onOpen, isOpen, onOpenChange } = useDisclosure()

  const { mutate } = useCreateConversion() // Call the hook properly

  const handleSwap = useCallback(() => {
    if (!amount || parseFloat(amount) <= 0) {
      setModalTitle('Error')
      setModalMessage('Invalid conversion. Enter a number greater than 0.')
      onOpen()
      return
    }

    setLoading(true)
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
  }, [amount, convertedAmount, fromToken, toToken, mutate, onOpen])

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
        <CurrencySelect
          label="From"
          value={fromToken}
          tokens={tokens}
          onChange={setFromToken}
        />

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
        <CurrencySelect
          label="To"
          value={toToken}
          tokens={tokens}
          onChange={setToToken}
        />

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
