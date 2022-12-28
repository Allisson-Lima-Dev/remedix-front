import { useQuery } from 'react-query';
import { HandleError } from '~/error/HandlerError';
import { api } from '../api';
import { IRequests } from '~/types/requests';

interface IAdmin {
  user_admin: {
    name: string;
    avatarUrl: string;
    email: string;
    company: {
      uuid: string;
      company_name: string;
      whatsapp_phone_number: string;
    };
  };
}

export async function getAdmin() {
  try {
    const { data } = await api.get<IAdmin>(`/admin/me`);
    return data;
  } catch (error) {
    throw new HandleError(error);
  }
}

export function useAdmin() {
  return useQuery<IAdmin>(['admin'], () => getAdmin(), {
    // staleTime: 1000 * 5,
    // refetchOnWindowFocus: false,
  });
}
