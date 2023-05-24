import React, { useState, useCallback, useContext, Context } from "react";
import { authSignIn, SignInPayload, logout } from "../services/auth";
import { AuthContext } from "..";
import { findAll, create, findOne, update, destroy } from "../services/product";

export interface Product {
  id: string;
  name: string;
  image: string;
  buyPrice: number;
  sellPrice: number;
  quantity: number;
  createdTime: string;
  createdDate: string;
  year: number;
  lastUpdatedTime: string;
  month: number;
  createdBy: number;
  lastUpdatedBy: string;
  archived: boolean;
}

export const useProvideApp = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem("token")
  );

  const [productList, setProductList] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product>();
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalProduct, setTotalProduct] = useState<number>(0);
  const [page, setPage] = useState<number>(0);

  const signIn = useCallback((value: SignInPayload) => {
    authSignIn(value).then((isSuccess) => setIsAuthenticated(!!isSuccess));
  }, []);

  const logOut = useCallback(() => {
    logout();
    setIsAuthenticated(false);
  }, []);

  const fetchProductList = useCallback((params: any) => {
    findAll(params).then((data) => {
      setProductList(data?.items);
      setPage(data?.currentPage);
      setTotalProduct(data?.totalItems);
      setTotalPages(data?.totalPages);
    });
  }, []);

  const fetchProduct = useCallback((id: string) => {
    findOne(id).then((data) => {
      setProduct(data);
    });
  }, []);

  const addProduct = useCallback(
    (payload: any, onSuccess: () => void, onFail: () => void) => {
      create(payload, onSuccess, onFail);
    },
    []
  );

  const updateProduct = useCallback(
    (id: string, payload: any, onSuccess: () => void, onFail: () => void) => {
      update(id, payload, onSuccess, onFail);
    },
    []
  );

  const deleteProduct = useCallback(
    (id: string, onSuccess: () => void, onFail: () => void) => {
      destroy(id, onSuccess, onFail);
    },
    []
  );

  return {
    isAuthenticated,
    productList,
    product,
    page,
    totalPages,
    totalProduct,
    signIn,
    logOut,
    fetchProductList,
    fetchProduct,
    addProduct,
    updateProduct,
    deleteProduct,
  };
};

export const useApp = () => {
  return useContext(AuthContext as Context<AuthType>);
};

export interface AuthType {
  isAuthenticated: boolean;
  productList: Product[];
  product: Product;
  page: number;
  totalPages: number;
  totalProduct: number;
  signIn: (value: SignInPayload) => void;
  logOut: () => void;
  fetchProductList: (params: any) => void;
  fetchProduct: (id: string) => void;
  addProduct: (
    payload: any,
    onSuccess?: () => void,
    onFail?: () => void
  ) => void;
  updateProduct: (
    id: string | number,
    payload: any,
    onSuccess?: () => void,
    onFail?: () => void
  ) => void;
  deleteProduct: (
    id: string | number,
    onSuccess?: () => void,
    onFail?: () => void
  ) => void;
}
