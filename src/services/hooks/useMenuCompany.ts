import { useQuery } from 'react-query';
import { HandleError } from '~/error/HandlerError';
import { api } from '../api';
import { IRequests } from '~/types/requests';

interface IMenuCompany {
  menu_company: {
    menu_name: string;
    id: string;
    active: boolean;
    coupon_id: string | null;
  }[];
}

export async function getMenuCompany() {
  try {
    const { data } = await api.get<IMenuCompany>(`/admin/menu/company`);
    return data;
  } catch (error) {
    throw new HandleError(error);
  }
}

export function useMenuCompany() {
  return useQuery<IMenuCompany>(['menu_company'], () => getMenuCompany(), {
    // staleTime: 1000 * 5,
    // refetchOnWindowFocus: false,
  });
}
