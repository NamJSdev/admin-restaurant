import { url } from "inspector";
import axiosClient from "./axiosClient";

class HandleCustomers {
  getCustomers = async (url: string) => {
    return axiosClient.get(`/api${url}`); // Sử dụng /api trên máy chủ Next.js
  }
  deleteCustomer = async (url: string) => {
    return axiosClient.delete(`/api${url}`);
  }
  postCustomer = async (url: string) => {
    return axiosClient.post(`/api${url}`);
  }
}

const handleCustomers = new HandleCustomers();
export default handleCustomers;