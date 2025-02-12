import { BACKEND_ROUTE } from '@/constants/backend_route'
import { ConversionRequest } from '@/types/conversion'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const createConversion = async (conversionData: ConversionRequest) => {
  const response = await fetch(BACKEND_ROUTE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(conversionData),
  })

  if (!response.ok) {
    throw new Error('Failed to create conversion history')
  }

  return response.json()
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
