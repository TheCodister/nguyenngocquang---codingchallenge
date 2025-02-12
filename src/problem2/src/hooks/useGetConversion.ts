import { BACKEND_ROUTE } from '@/constants/backend_route'
import { Conversion } from '@/types/conversion'
import { useQuery } from '@tanstack/react-query'

const fetchConversions = async (): Promise<Conversion[]> => {
  const response = await fetch(BACKEND_ROUTE)
  if (!response.ok) {
    throw new Error('Failed to fetch conversions')
  }
  return response.json()
}

export const useGetConversions = () => {
  return useQuery({
    queryKey: ['conversions'],
    queryFn: fetchConversions,
  })
}
