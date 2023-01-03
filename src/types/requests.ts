export interface IData_Response_Default<T> {
  current_page: number;
  per_page: number;
  total_count: number;
  total_pages: number;
  next: boolean;
  prev: boolean;
  data: T[];
}

export interface ItemsRequest extends Shopping_Cart_Item {
  menu_item: Items_Menu;
}

export interface IDataRequests extends Requests_Client {
  request_details: {
    items_request: ItemsRequest[];
  };
  user_request: Clients_Company;
  address: Address_User[];
}

export interface IRequests {
  page?: number;
  per_page?: number;
  status?: string;
  startDate?: string;
  endDate?: string;
  search?: string;
}

export type Company = {
  uuid: string;
  whatsapp_account_id: string;
  whatsapp_phone_number: string;
  whatsapp_phone_number_id: string;
  nif_number: string;
  company_name: string;
  address_company_id: number;
  createdAt: string;
  updatedAt: string;
};

/**
 * Model User_Company
 *
 */
export type User_Company = {
  uuid: string;
  function_sector: string | null;
  name: string;
  email: string;
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
  password: string;
  company_id: string | null;
};

/**
 * Model Opening_Hours_Company
 *
 */
export type Opening_Hours_Company = {
  id: string;
  day: string;
  active: boolean;
  start_hours: string;
  end_hours: string;
  companyUuid: string | null;
};

/**
 * Model Menu_Company
 *
 */
export type Menu_Company = {
  id: string;
  menu_name: string;
  active: boolean;
  tag: string | null;
  coupon_id: string | null;
  company_id: string | null;
  createdAt: string;
  updatedAt: string;
};

/**
 * Model Coupon_Request_Menu
 *
 */
export type Coupon_Request_Menu = {
  id: string;
  active: boolean;
  start_date: Date | null;
  end_date: Date | null;
  coupon_name: string | null;
  price_coupon: number | null;
  type_cuopon: string | null;
  total_count: number | null;
  createdAt: string;
  updatedAt: string;
};

/**
 * Model Address_Company
 *
 */
export type Address_Company = {
  id: number;
  state: string;
  city: string;
  district: string;
  street: string;
  number_home: string;
  cep: string | null;
};

/**
 * Model Plans_Company
 *
 */
export type Plans_Company = {
  id: string;
  product_name: string;
  price: number;
  active: boolean;
  expiration: Date | null;
  company_id: string | null;
  createdAt: string;
  updatedAt: string;
};

/**
 * Model Clients_Company
 *
 */
export type Clients_Company = {
  uuid: string;
  from: string | null;
  name: string;
  createdAt: string;
  updatedAt: string;
  company_id: string | null;
};

/**
 * Model Requests_Client
 *
 */
export type Requests_Client = {
  id: number;
  type: string;
  status: string;
  total_amount: number | null;
  user_request_id: string;
  createdAt: string;
  updatedAt: string;
  company_id: string | null;
};

/**
 * Model Shopping_Cart
 *
 */
export type Shopping_Cart = {
  id: string;
  request_client_id: number | null;
  createdAt: string;
  updatedAt: string;
};

/**
 * Model Shopping_Cart_Item
 *
 */
export type Shopping_Cart_Item = {
  id: string;
  menu_item_id: string;
  note: string | null;
  quantity: number;
  shopping_cart_id: string | null;
};

/**
 * Model Items_Menu
 *
 */
export type Items_Menu = {
  uuid: string;
  title: string;
  description: string;
  amount: number;
  amount_promotion: number | null;
  accept_note: boolean | null;
  active: boolean;
  unity: number | null;
  size: string | null;
  image_product: string | null;
  category_menu_id: string;
  coupon_request_menu_id: string | null;
  company_id: string | null;
  createdAt: string;
  updatedAt: string;
};

/**
 * Model Complement_Request
 *
 */
export type Complement_Request = {
  uuid: string;
  unity_min: number;
  unity_max: number;
  price: number;
  shopping_cart_item_id: string | null;
};

/**
 * Model Address_User
 *
 */
export type Address_User = {
  id: number;
  city: string | null;
  district: string;
  street: string;
  number_home: string;
  cep: string | null;
  userUuid: string | null;
  requestsId: number | null;
};
