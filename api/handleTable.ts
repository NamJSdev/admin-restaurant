import axios from 'axios';
import axiosClient from "./axiosClient";

class HandleTables {
    getTables = async (url: string) => {
        return axiosClient.get(`/api${url}`);
    };
    getTableOption = async (url: string) => {
        return axiosClient.get(`/api${url}`);
    };

    deleteTable = async (url: string) => {
        return axiosClient.delete(`/api${url}`);
    };
    deleteTableOption = async (url: string) => {
        return axiosClient.delete(`/api${url}`);
    };

    addTable = async (TableData: any) => {
        try {
            const formData = new FormData();
    
            formData.append('ViTri', TableData.viTri);
            formData.append('SoBan', TableData.soBan);
            formData.append('SoNguoiToiDa', TableData.soNguoiToiDa);
            formData.append('GiaTien', TableData.giaTien);
            formData.append('LoaiBanID', TableData.loaiBanID);
            formData.append('Mota', TableData.moTa);
            formData.append('TinhTrangHienTai', TableData.tinhTrangHienTai);
            formData.append('HinhAnhBanURL', TableData.hinhAnhBanURL);
            const config = {
                headers: {
                    'content-type': 'multipart/form-data; charset=utf-8; boundary="------";'
                }
            }
            const response = await axiosClient.post("/api/Ban/ThemBan", formData, config);
            // return response.data;
        } catch (error) {
            // Xử lý lỗi ở đây
            console.error("Error adding food option:", error);
            throw error; // Nếu bạn muốn chuyển lỗi ra ngoại vi để xử lý ở nơi khác
        }
    }
    addTableOption = async (TableOptionData: any) => {
        try {
            const formData = new FormData();
    
            formData.append('TenLoaiBan', TableOptionData.tenLoaiBan);
            const config = {
                headers: {
                    'content-type': 'multipart/form-data; charset=utf-8; boundary="------";'
                }
            }
            const response = await axiosClient.post("/api/LoaiBan/ThemLoaiBan", formData, config);
            // console.log(response)
            return response.data;
        } catch (error) {
            // Xử lý lỗi ở đây
            console.error("Error adding food option:", error);
            throw error; // Nếu bạn muốn chuyển lỗi ra ngoại vi để xử lý ở nơi khác
        }
    }
    upadateTableOption = async (TableOptionData: any, id: number) => {
    
        console.log(id)
        try {
            const formData = new FormData();
    
            formData.append('TenLoaiBan', TableOptionData.tenLoaiBan);
            const config = {
                headers: {
                    'content-type': 'multipart/form-data; charset=utf-8; boundary="------";'
                }
            }
            const response = await axiosClient.put(`/api/LoaiBan/SuaLoaiBan/${id}`, formData, config);
            // console.log(response)
            return response.data;
        } catch (error) {
            // Xử lý lỗi ở đây
            console.error("Error adding food option:", error);
            throw error; // Nếu bạn muốn chuyển lỗi ra ngoại vi để xử lý ở nơi khác
        }
    }
}

const handleTales = new HandleTables();
export default handleTales;
