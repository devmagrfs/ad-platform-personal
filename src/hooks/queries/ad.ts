import {useQuery, useMutation, useQueryClient, useQueries} from 'react-query';
import {
  getAdsList,
  adCreate,
  adUpdate,
  adDelete,
  getReport,
  getChannel,
  getAllReports,
} from '@api/queries';
import {IAds} from '@type/models/management';

export const useAdListQuery = () => useQuery<IAds[]>('ads', getAdsList);

export const useAddMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(adCreate, {
    onSuccess: () => queryClient.invalidateQueries('abs'),
  });
};

export const useUpdateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(adUpdate, {
    onSuccess: () => queryClient.invalidateQueries('abs'),
  });
};

export const useDeleteMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(adDelete, {
    onSuccess: () => queryClient.invalidateQueries('abs'),
  });
};

export const useBoardQueries = (type: string) =>
  useQueries([
    {
      queryKey: ['allReports'],
      queryFn: getAllReports,
    },
    {
      queryKey: ['report', type],
      queryFn: () => getReport(new Date(type)),
    },
    {
      queryKey: ['channel', type],
      queryFn: () => getChannel(new Date(type)),
    },
  ]);
