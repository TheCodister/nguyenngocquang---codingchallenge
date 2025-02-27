export interface ConversionRequest {
  fromCurrency: string
  toCurrency: string
  fromAmount: number
  toAmount: number
  createdAt: string
}

export interface Conversion {
  id: string
  fromCurrency: string
  toCurrency: string
  fromAmount: number
  toAmount: number
  date: string
}
