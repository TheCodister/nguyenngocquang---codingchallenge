import { BACKEND_ROUTE } from '@/constants/backend_route'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const deleteConversion = async (id: string) => {
  const response = await fetch(`${BACKEND_ROUTE}/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error('Failed to delete conversion')
  }
}

export const useDeleteConversion = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteConversion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversions'] }) // Refresh data after delete
    },
  })
}
