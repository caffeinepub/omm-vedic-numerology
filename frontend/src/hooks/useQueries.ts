import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { ServiceType, BookingCategory } from '../backend';

export interface CreateBookingInput {
  serviceType: ServiceType;
  category: BookingCategory;
  customerName: string;
  phoneNumber: string;
  preferredDate: string;
  message: string | null;
}

export function useCreateBooking() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateBookingInput) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.createBooking(
        input.serviceType,
        input.category,
        input.customerName,
        input.phoneNumber,
        input.preferredDate,
        input.message
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
}
