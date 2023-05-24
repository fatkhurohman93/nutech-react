import axios from "axios";
import { AUTH_PATH, AUTH_ROUTE, BASE_API } from "../constants";
import { notification } from "antd";

export interface SignInPayload {
  userName: string;
  password: string;
}

const { success, error } = notification;

export const authSignIn = async (payload: SignInPayload) => {
  try {
    const result = await axios.post(
      `${BASE_API}/${AUTH_ROUTE}/${AUTH_PATH.signIn}`,
      {
        ...payload,
      }
    );

    if (result.status === 200) {
      localStorage.setItem("token", result?.data?.data?.token);
      localStorage.setItem("name", result?.data?.data?.name);

      success({
        key: "Success Login",
        message: "Success Login",
      });
      return true;
    }
  } catch (err: any) {
    error({
      key: err?.response?.data?.message,
      message: err?.response?.data?.message,
    });
    return false;
  }
};

export const logout = () => {
  localStorage.clear();
};
