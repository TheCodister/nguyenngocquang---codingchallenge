export const findPrice = (
  prices: { currency: string; price: number }[],
  token: string,
) => {
  return prices?.find((p) => p.currency === token)?.price || 0
}

export const calculateConvertedAmount = (
  amount: string,
  fromPrice: number,
  toPrice: number,
) => {
  return fromPrice && toPrice && amount
    ? (parseFloat(amount) * fromPrice) / toPrice
    : 0
}
