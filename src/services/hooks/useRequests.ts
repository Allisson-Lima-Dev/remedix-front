import { useQuery } from 'react-query';
import { HandleError } from '~/error/HandlerError';
import { api } from '../api';
import { IRequests } from '~/types/requests';

export async function CreateRequest(id?: string) {
  try {
    const { data } = await api.get(`/requests/receipt/download/${id}`);
  } catch (error) {
    throw new HandleError(error);
  }
}
export async function getReceiptRequest(id?: string): Promise<any> {
  try {
    CreateRequest(id).finally(async () => {
      const res = await fetch(`http://localhost:3000/requests/download/${id}`);
      const data = await res.arrayBuffer();
      const result = new DataView(data);
      const newBlob = new Blob([result], { type: 'application/pdf' });
      const fileURL = window.URL.createObjectURL(newBlob);
      return fileURL;
    });
    //   const data = await res.arrayBuffer();
    //   const result = new DataView(data);
  } catch (error) {
    throw new HandleError(error);
  }
}

async function getRequests({
  page,
  per_page,
  endDate,
  search,
  startDate,
  status,
}: IRequests) {
  try {
    const { data } = await api.get(
      `/requests?per_page=${per_page || 100}&page=${page || 1}${
        status ? `&status=${status}` : ''
      }`
    );
    return data;
  } catch (error) {
    console.log();
  }
}

export function useRequest({
  page,
  per_page,
  endDate,
  search,
  startDate,
  status,
}: IRequests) {
  return useQuery(
    ['AllRequests', { page, per_page, endDate, search, startDate, status }],
    () => getRequests({ page, per_page, status }),
    {
      // staleTime: 1000 * 1,
      // refetchInterval: 1000 * 10,
    }
  );
}
export function useReceiptRequest(id?: string) {
  return useQuery(['ReceiptRequest', { id }], () => getReceiptRequest(id), {
    staleTime: 1000 * 5,
  });
}
