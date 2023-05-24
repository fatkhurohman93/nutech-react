import axios from "axios";
import { PRODUCT_PATH, PRODUCT_ROUTE, BASE_API } from "../constants";
import { notification } from "antd";

const token = localStorage.getItem("token");

export interface ProductPayload {
  name: string;
  image?: string;
  quantity: number;
  buyPrice: number;
  sellPrice: number;
}

export interface ProductParams {
  name?: string;
  page?: number;
}

export const create = async (
  payload?: ProductPayload,
  onSuccess?: () => void,
  onFail?: () => void
) => {
  try {
    const result = await axios.post(
      `${BASE_API}/${PRODUCT_ROUTE}/${PRODUCT_PATH.create}`,
      { ...payload },
      {
        headers: {
          token,
        },
      }
    );

    if (result.status === 200) {
      notification.success({
        key: "create.success",
        message: "Product was created successfully.",
      });
      onSuccess && onSuccess();
      return true;
    }

    onFail && onFail();

    return false;
  } catch (err: any) {
    notification.error({
      key: err?.response?.data?.message,
      message: err?.response?.data?.message,
    });
    onFail && onFail();
  }
};

export const findAll = async (params?: ProductParams) => {
  try {
    const result = await axios.post(
      `${BASE_API}/${PRODUCT_ROUTE}/${PRODUCT_PATH.findAll}`,
      { ...params },
      {
        headers: {
          token,
        },
      }
    );
    if (result.status === 200) {
      return result?.data?.data;
    }
  } catch (err: any) {
    notification.error({
      key: err?.response?.data?.message,
      message: err?.response?.data?.message,
    });
  }
};

export const findOne = async (id?: string) => {
  try {
    const result = await axios.post(
      `${BASE_API}/${PRODUCT_ROUTE}/${PRODUCT_PATH.findOne}/${id}`,
      {},
      {
        headers: {
          token,
        },
      }
    );
    if (result.status === 200) {
      return result?.data?.data;
    }
  } catch (err: any) {
    notification.error({
      key: err?.response?.data?.message,
      message: err?.response?.data?.message,
    });
  }
};

export const update = async (
  id: string,
  payload?: ProductPayload,
  onSuccess?: () => void,
  onFail?: () => void
) => {
  try {
    const result = await axios.put(
      `${BASE_API}/${PRODUCT_ROUTE}/${PRODUCT_PATH.update}/${id}`,
      { ...payload },
      {
        headers: {
          token,
        },
      }
    );

    if (result.status === 200) {
      notification.success({
        key: "update.success",
        message: "Product was updated successfully.",
      });
      onSuccess && onSuccess();
      return true;
    }

    onFail && onFail();

    return false;
  } catch (err: any) {
    notification.error({
      key: err?.response?.data?.message,
      message: err?.response?.data?.message,
    });
    onFail && onFail();
  }
};

export const destroy = async (
  id: string,
  onSuccess?: () => void,
  onFail?: () => void
) => {
  try {
    const result = await axios.delete(
      `${BASE_API}/${PRODUCT_ROUTE}/${PRODUCT_PATH.destroy}/${id}`,
      {
        headers: {
          token,
        },
      }
    );

    if (result.status === 200) {
      notification.success({
        key: "delete.success",
        message: "Product was deleted successfully.",
      });
      onSuccess && onSuccess();
      return true;
    }

    onFail && onFail();

    return false;
  } catch (err: any) {
    notification.error({
      key: err?.response?.data?.message,
      message: err?.response?.data?.message,
    });
    onFail && onFail();
  }
};
