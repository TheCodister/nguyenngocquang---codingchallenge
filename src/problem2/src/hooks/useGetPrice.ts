import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

interface PriceData {
  currency: string
  date: string
  price: number
}

const fetchPrices = async (): Promise<PriceData[]> => {
  const { data } = await axios.get<PriceData[]>(
    'https://interview.switcheo.com/prices.json',
  )
  const filteredData = data.reduce(
    (acc, curr) => {
      if (
        !acc[curr.currency] ||
        new Date(acc[curr.currency].date) < new Date(curr.date)
      ) {
        acc[curr.currency] = curr
      }
      return acc
    },
    {} as Record<string, PriceData>,
  )

  return Object.values(filteredData)
}

const useGetPrice = () => {
  return useQuery({
    queryKey: ['prices'],
    queryFn: fetchPrices,
    staleTime: Infinity, // Cache data indefinitely since it's static
    retry: 2,
  })
}

export default useGetPrice
