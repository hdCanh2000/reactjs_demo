import AxiosClient from "./axios";

const getAllUser = () => {
  return AxiosClient.get("/users?page=1");
};

export { getAllUser };
