import axios from 'axios';
import axiosClient from "./axiosClient";

class HandleFoods {
    getFoods = async (url: string) => {
        return axiosClient.get(`/api${url}`);
    };
    getFoodOption = async (url: string) => {
        return axiosClient.get(`/api${url}`);
    };

    deleteFood = async (url: string) => {
        return axiosClient.delete(`/api${url}`);
    };
    deleteFoodOption = async (url: string) => {
        return axiosClient.delete(`/api${url}`);
    };

    addFood = async (FoodData: any) => {
        try {
            const formData = new FormData();
            formData.append('LoaiMonAnID', FoodData.loaiMonAnID);
            formData.append('TenMon', FoodData.tenMon);
            formData.append('MoTa', FoodData.moTa);
            formData.append('TenMon', FoodData.tenMon);
            formData.append('GiaTien', FoodData.giaTien);
            formData.append('AnhMonAn1URL', FoodData.anhMonAn1URL);
            const config = {
                headers: {
                    'content-type': 'multipart/form-data; charset=utf-8; boundary="------";'
                }
            }
            const response = await axiosClient.post("/api/MonAn/ThemMonAn", formData, config);
            // return response.data;
        } catch (error) {
            // Xử lý lỗi ở đây
            console.error("Error adding food option:", error);
            throw error; // Nếu bạn muốn chuyển lỗi ra ngoại vi để xử lý ở nơi khác
        }
    }
    updateFood = async (FoodData: any, id: number) => {
        try {
            const formData = new FormData();

            formData.append('LoaiMonAnID', FoodData.loaiMonAnID);
            formData.append('TenMon', FoodData.tenMon);
            formData.append('MoTa', FoodData.moTa);
            formData.append('TenMon', FoodData.tenMon);
            formData.append('GiaTien', FoodData.giaTien);
            formData.append('AnhMonAn1URL', FoodData.anhMonAn1URL);
            const config = {
                headers: {
                    'content-type': 'multipart/form-data; charset=utf-8; boundary="------";'
                }
            }
            const response = await axiosClient.put(`/api/MonAn/SuaMonAn/${id}`, formData, config);
            // return response.data;
        } catch (error) {
            // Xử lý lỗi ở đây
            console.error("Error adding food option:", error);
            throw error; // Nếu bạn muốn chuyển lỗi ra ngoại vi để xử lý ở nơi khác
        }
    }
    addFoodOption = async (FoodOptionData: any) => {
        try {
            const formData = new FormData();

            formData.append('tenLoaiMonAn', FoodOptionData.tenLoaiMonAn);
            const config = {
                headers: {
                    'content-type': 'multipart/form-data; charset=utf-8; boundary="------";'
                }
            }
            const response = await axiosClient.post("/api/LoaiMonAn/ThemLoaiMonAn", formData, config);
            // console.log(response)
            return response.data;
        } catch (error) {
            // Xử lý lỗi ở đây
            console.error("Error adding food option:", error);
            throw error; // Nếu bạn muốn chuyển lỗi ra ngoại vi để xử lý ở nơi khác
        }
    }
    upadateFoodOption = async (FoodOptionData: any, id: number) => {

        console.log(id)
        try {
            const formData = new FormData();

            formData.append('TenLoai', FoodOptionData.tenLoai);
            const config = {
                headers: {
                    'content-type': 'multipart/form-data; charset=utf-8; boundary="------";'
                }
            }
            const response = await axiosClient.put(`/api/LoaiMonAn/SuaLoaiMonAn/${id}`, formData, config);
            // console.log(response)
            return response.data;
        } catch (error) {
            // Xử lý lỗi ở đây
            console.error("Error adding food option:", error);
            throw error; // Nếu bạn muốn chuyển lỗi ra ngoại vi để xử lý ở nơi khác
        }
    }
}

const handleFoods = new HandleFoods();
export default handleFoods;
