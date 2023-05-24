export const BASE_ROUTE = "http://localhost:4000";
export const BASE_API = `${BASE_ROUTE}/api`;

export const AUTH_ROUTE = "auth";
export const PRODUCT_ROUTE = "product";

export enum AUTH_PATH {
  signIn = "signin",
  signUp = "signup",
}

export enum PRODUCT_PATH {
  create = "create",
  findAll = "findall",
  findOne = "findone",
  update = "update",
  archived = "archived",
  unarchived = "unarchived",
  destroy = "destroy",
}
