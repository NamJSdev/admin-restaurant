import axios from 'axios';
import axiosClient from "./axiosClient";

class HandleChefs {
    getChefs = async (url: string) => {
        return axiosClient.get(`/api${url}`);
    };

    deleteChef = async (url: string) => {
        return axiosClient.delete(`/api${url}`);
    };

    addChef = async (chefData: any) => {
        try {
            const formData = new FormData();

            formData.append('hoTen', chefData.hoTen);
            formData.append('ngaySinh', chefData.ngaySinh);
            formData.append('sdt', chefData.sdt);
            formData.append('moTa', chefData.moTa);
            formData.append('anhDauBepURl', chefData.anhDauBepURl);
            const config = {
                headers: {
                    'content-type': 'multipart/form-data; charset=utf-8; boundary="------";'
                }
            }
            const response = await axiosClient.post("/api/DauBep/ThemDauBep", formData, config);
            // console.log(response)
            return response.data;

        } catch (error) {
            console.error("Error uploading image or adding chef:", error);
            throw error; // Bạn có thể xử lý lỗi ở đây theo cách phù hợp với ứng dụng của bạn
        }
    };

    updateChef = async (chefData: any) => {
        try {
            const formData = new FormData();

            formData.append('hoTen', chefData.hoTen);
            formData.append('ngaySinh', chefData.ngaySinh);
            formData.append('sdt', chefData.sdt);
            formData.append('moTa', chefData.moTa);
            formData.append('anhDauBepURl', chefData.anhDauBepURl);
            const config = {
                headers: {
                    'content-type': 'multipart/form-data; charset=utf-8; boundary="------";'
                }
            }
            const response = await axiosClient.post("/api/DauBep/ThemDauBep", formData, config);
            // console.log(response)
            return response.data;

        } catch (error) {
            console.error("Error uploading image or adding chef:", error);
            throw error; // Bạn có thể xử lý lỗi ở đây theo cách phù hợp với ứng dụng của bạn
        }
    };
}

const handleChefs = new HandleChefs();
export default handleChefs;
