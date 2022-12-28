import { useQuery } from 'react-query';
import { HandleError } from '~/error/HandlerError';
import { api } from '../api';
import { IRequests } from '~/types/requests';

interface IMenuItems {
  items_menu: {
    uuid: string;
    title: string;
    description: string;
    amount: number;
    amount_promotion: number | null;
    accept_note: boolean;
    unity: number;
    size: string | null;
    image_product: string | null;
    category_menu_id: string;
    coupon_request_menu_id: string | null;
    company_id: string;
  }[];
}

export async function getMenuItems(id: string) {
  try {
    const { data } = await api.get<IMenuItems>(`/admin/menu/items/count`);
    return data;
  } catch (error) {
    throw new HandleError(error);
  }
}

export function useMenuItems(id: string) {
  return useQuery<IMenuItems>(
    ['menu_company', { id }],
    () => getMenuItems(id),
    {
      // staleTime: 1000 * 5,
      // refetchOnWindowFocus: false,
    }
  );
}
