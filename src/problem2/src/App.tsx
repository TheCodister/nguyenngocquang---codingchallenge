import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
  Spinner,
  useDisclosure,
} from '@heroui/react'
import { ReactNode, useCallback, useMemo, useState } from 'react'
import ConversionTable from './components/ConversionTable'
import CurrencySelect from './components/CurrencySelect'
import PopupModal from './components/PopupModal'
import {
  ERROR_NUMBER_MESSAGE,
  ERROR_SWAP_MESSAGE,
} from './constants/modal-message'
import { useCreateConversion } from './hooks/useCreateConversion'
import useGetPrice from './hooks/useGetPrice'
import { calculateConvertedAmount, findPrice } from './utils/conversion'

export default function CurrencySwapForm() {
  const { data: prices, isLoading, error } = useGetPrice()
  const tokens = prices?.map((p) => p.currency) || []

  const [fromToken, setFromToken] = useState('ETH')
  const [toToken, setToToken] = useState('bNEO')
  const [amount, setAmount] = useState('')
  const [modalMessage, setModalMessage] = useState<ReactNode>('')
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

  const { mutate, isPending } = useCreateConversion() // Call the hook properly

  const handleSwap = useCallback(() => {
    if (!amount || parseFloat(amount) <= 0) {
      setModalTitle(ERROR_NUMBER_MESSAGE[0])
      setModalMessage(ERROR_NUMBER_MESSAGE[1])
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
            <p>
              Swapped <strong>{amount}</strong> {fromToken} →{' '}
              <strong>{convertedAmount.toFixed(6)}</strong> {toToken}
            </p>,
          )
          onOpen()
        },
        onError: (error) => {
          setModalTitle(ERROR_SWAP_MESSAGE[0])
          setModalMessage(error.message || ERROR_SWAP_MESSAGE[1])
          onOpen()
        },
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
    <Card
      className="flex flex-col p-4 gap-4 max-w-4xl rounded-lg"
      style={{ backgroundColor: '#99c7fb' }}
    >
      <CardHeader className="text-2xl font-semibold text-center flex items-center justify-center">
        <h1>Currency Swap</h1>
      </CardHeader>
      <Divider />
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
          isLoading={isPending}
          onPress={handleSwap}
          className="w-full"
        >
          Swap
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
      <Divider />
      <CardFooter>
        <ConversionTable />
      </CardFooter>
    </Card>
  )
}
