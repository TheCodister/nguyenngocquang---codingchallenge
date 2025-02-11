import {
  Button,
  Input,
  Select,
  SelectItem,
  Spinner,
  useDisclosure,
} from '@heroui/react'
import { useState } from 'react'
import PopupModal from './components/popup-modal'
import useGetPrice from './hooks/useGetPrice'

export default function CurrencySwapForm() {
  const { data: prices, isLoading, error } = useGetPrice()
  const tokens = prices?.map((p) => p.currency) || []

  const [fromToken, setFromToken] = useState('ETH')
  const [toToken, setToToken] = useState('BTC')
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

  const handleSwap = () => {
    if (!amount || parseFloat(amount) <= 0) {
      setModalTitle('Error')
      setModalMessage('Invalid conversion. Enter a number greater than 0.')
      onOpen()
      return
    }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setModalTitle('Success')
      setModalMessage(
        `Swapped ${amount} ${fromToken} → ${convertedAmount.toFixed(6)} ${toToken}`,
      )
      onOpen()
    }, 1500)
  }

  if (isLoading)
    return (
      <div className="absolute inset-0 flex justify-center items-center">
        <Spinner size="lg" color="primary" />
      </div>
    )

  if (error) return <div className="text-red-500">Error fetching prices</div>

  return (
    <div className="flex flex-col p-4 gap-4 max-w-lg mx-auto">
      <h2 className="text-xl font-semibold text-center mb-4">Currency Swap</h2>

      {/* From Currency Selection */}
      <label className="text-sm font-medium">From</label>
      <Select
        selectedKeys={new Set([fromToken])}
        onSelectionChange={(keys) =>
          setFromToken(Array.from(keys as Set<string>)[0])
        }
      >
        {tokens.map((token) => (
          <SelectItem key={token} value={token}>
            {token}
          </SelectItem>
        ))}
      </Select>

      {/* Amount Input */}
      <Input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
        className="mb-4"
      />

      {/* To Currency Selection */}
      <label className="text-sm font-medium">To</label>
      <Select
        selectedKeys={new Set([toToken])}
        onSelectionChange={(keys) =>
          setToToken(Array.from(keys as Set<string>)[0])
        }
      >
        {tokens.map((token) => (
          <SelectItem key={token} value={token}>
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
        disabled={!amount || parseFloat(amount) <= 0 || !fromPrice || !toPrice}
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
    </div>
  )
}
