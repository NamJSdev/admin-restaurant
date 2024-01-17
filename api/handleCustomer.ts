import axiosClient from "./axiosClient";

class HandleCustomers {
  getCustomers = async (url: string) => {
    return axiosClient.get(`/api${url}`); // Sử dụng /api trên máy chủ Next.js
  }
  getCustomerByPhone = async (phone: string) => {
      const response = await axiosClient.get(`/api/KhachHang/HienThiKhachHangSDT/?sdt=${phone}`);
      return response.data;
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