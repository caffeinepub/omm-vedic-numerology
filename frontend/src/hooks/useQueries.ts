import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { BookingRequest, Booking } from '../backend';

export class BookingSubmissionError extends Error {
  constructor(public errorType: string) {
    super(`Booking failed: ${errorType}`);
  }
}

export function useCreateBooking() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (request: BookingRequest): Promise<Booking> => {
      if (!actor) throw new Error('Actor not available');
      const result = await actor.createBooking(request);
      if (result.__kind__ === 'ok') {
        return result.ok;
      } else {
        throw new BookingSubmissionError(result.err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['totalBookingCount'] });
    },
  });
}

export function useGetTotalBookingCount() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<bigint>({
    queryKey: ['totalBookingCount'],
    queryFn: async () => {
      if (!actor) return BigInt(0);
      return actor.getTotalBookingCount();
    },
    enabled: !!actor && !actorFetching,
    refetchInterval: 60000,
  });
}
