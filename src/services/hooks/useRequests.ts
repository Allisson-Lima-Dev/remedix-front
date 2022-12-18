import { useQuery } from 'react-query';
import { HandleError } from '~/error/HandlerError';
import { api } from '../api';

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

async function getRequests(page: number, per_page: number) {
  try {
    const { data } = await api.get(
      `/requests?per_page=${per_page}&page=${page}`
    );
    return data;
  } catch (error) {
    console.log();
  }
}

export function useRequest(page?: number, per_page?: number) {
  return useQuery(
    ['AllRequests', { page, per_page }],
    () => getRequests(page || 1, per_page || 200),
    {
      staleTime: 1000 * 5,
    }
  );
}
export function useReceiptRequest(id?: string) {
  return useQuery(['ReceiptRequest', { id }], () => getReceiptRequest(id), {
    staleTime: 1000 * 5,
  });
}
