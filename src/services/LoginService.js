import AxiosClient from "./axios";

const postLogin = (data) => {
  return AxiosClient.post(`/api/login`, data);
};

export { postLogin };
