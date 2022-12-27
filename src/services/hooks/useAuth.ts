import { api } from '../api';
import { HandleError } from '~/error/HandlerError';
import { authToken, SignInRequestData } from '~/types/auth';

export async function signInRequest(signin: SignInRequestData) {
  try {
    const { data } = await api.post<authToken>('/auth/signIn', signin);
    return data;
  } catch (error: any) {
    throw new HandleError(error.response);
  }
}
