import { TApiError } from "./types";

export const getApiErrorMessage = (err: unknown) => {
  const errObj = err as TApiError;
  return (
    errObj.response?.data.message ||
    errObj.message ||
    "Something went wrong pls contact support"
  );
};
