import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { ServiceType, BookingCategory, BookingError, Booking } from '../backend';

export interface CreateBookingInput {
  serviceType: ServiceType;
  category: BookingCategory;
  customerName: string;
  phoneNumber: string;
  preferredDate: string;
  preferredTime: string;
  message: string | null;
}

export class BookingSubmissionError extends Error {
  constructor(public readonly errorKind: BookingError) {
    super(errorKind === BookingError.invalidInput ? 'Invalid input provided.' : 'An internal error occurred.');
    this.name = 'BookingSubmissionError';
  }
}

export function useCreateBooking() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateBookingInput): Promise<Booking> => {
      if (!actor) throw new Error('Actor not initialized. Please try again.');

      const result = await actor.createBooking({
        serviceType: input.serviceType,
        category: input.category,
        customerName: input.customerName,
        phoneNumber: input.phoneNumber,
        preferredDate: input.preferredDate,
        preferredTime: input.preferredTime,
        message: input.message ?? undefined,
      });

      // Unwrap the Result variant from the backend
      if (result.__kind__ === 'ok') {
        return result.ok;
      } else {
        throw new BookingSubmissionError(result.err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
}
