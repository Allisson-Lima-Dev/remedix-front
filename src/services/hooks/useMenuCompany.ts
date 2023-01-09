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
  }[];
}
export interface IUpdateMenuCategory {
  name_category?: string;
  active?: boolean;
}

export async function deleteMenuCompany(id: string) {
  try {
    const { data } = await api.delete(`/admin/menu/company/${id}`);
    return data;
  } catch (error) {
    throw new HandleError(error);
  }
}
export async function updateMenuCompany(
  id: string,
  dataMenu: IUpdateMenuCategory
) {
  try {
    const { data } = await api.put(`/admin/menu/company/${id}`, dataMenu);
    return data;
  } catch (error) {
    throw new HandleError(error);
  }
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
