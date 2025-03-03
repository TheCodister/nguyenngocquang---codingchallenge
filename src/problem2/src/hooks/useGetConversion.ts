import { BACKEND_ROUTE } from '@/constants/backend-route'
import { Conversion } from '@/types/conversiontype'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const fetchConversions = async (): Promise<Conversion[]> => {
  const { data } = await axios.get<Conversion[]>(BACKEND_ROUTE)
  return data
}

export const useGetConversions = () => {
  return useQuery({
    queryKey: ['conversions'],
    queryFn: fetchConversions,
  })
}
