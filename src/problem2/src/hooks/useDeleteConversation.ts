import { BACKEND_ROUTE } from '@/constants/backend-route'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

const deleteConversion = async (id: string) => {
  await axios.delete(`${BACKEND_ROUTE}/${id}`)
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
