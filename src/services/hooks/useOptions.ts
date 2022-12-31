import { useQuery } from 'react-query';
import { HandleError } from '~/error/HandlerError';
import { api } from '../api';
import { IRequests } from '~/types/requests';

interface IOptions {
  clients_users: {
    uuid: string;
    from: string | null;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
    company_id?: string | null;
  }[];
}

export async function getOptions() {
  try {
    const { data } = await api.get<IOptions>(`/admin/options`);
    let result = data.clients_users?.map((item) => {
      return {
        label: item.name,
        value: item.name,
        from: item.from || '',
      };
    });
    return result;
  } catch (error) {
    throw new HandleError(error);
  }
}

export function useOptions() {
  return useQuery(['options'], () => getOptions(), {
    // staleTime: 1000 * 5,
    // refetchOnWindowFocus: false,
  });
}
