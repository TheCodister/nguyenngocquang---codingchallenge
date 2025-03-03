import { BACKEND_ROUTE } from '@/constants/backend-route'
import { ConversionRequest } from '@/types/conversiontype'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

const createConversion = async (conversionData: ConversionRequest) => {
  const { data } = await axios.post(BACKEND_ROUTE, conversionData)
  return data
}

export const useCreateConversion = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createConversion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversions'] })
    },
  })
}
