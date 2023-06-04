import AxiosClient from "./axios";

const getAllUser = (page) => {
  return AxiosClient.get(`/api/users?page=${page}`);
};

const postNewUser = (data) => {
  return AxiosClient.post(`/api/users`, data);
};

const putUser = (data) => {
  return AxiosClient.put(`/api/users/2`, data);
};

const deleteUser = (id) => {
  return AxiosClient.delete(`/api/users/${id}`);
};

export { getAllUser, postNewUser, putUser, deleteUser };
