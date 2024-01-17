import axiosClient from "./axiosClient";

class AuthAPIs {
    login = async (valueLogin: string, password: string) => {
        console.log(valueLogin, password)
        try {
            const formData = new FormData();

            formData.append('UserName', valueLogin);
            formData.append('Password', password);
            const response = await axiosClient.post("/api/Admin/login", formData);
            console.log(response)
            return response;

        } catch (error) {
            console.error("Error login:", error);
            throw error; // Bạn có thể xử lý lỗi ở đây theo cách phù hợp với ứng dụng của bạn
        }
    }
    verifyMail = async (email: string) => {
        console.log(email)
        try {
            const formData = new FormData();

            formData.append('Email', email);
            const response = await axiosClient.post("/api/Admin/forgot-password", formData);
            return response;

        } catch (error) {
            console.error("Error login:", error);
            throw error; // Bạn có thể xử lý lỗi ở đây theo cách phù hợp với ứng dụng của bạn
        }
    }
    changePass = async (codeActive: string, password: string) => {
        console.log(codeActive, password)
        try {
            const formData = new FormData();

            formData.append('CodeActive', codeActive);
            formData.append('NewPassword', password);
            const response = await axiosClient.post("/api/Admin/create-new-password", formData);
            return response;

        } catch (error) {
            console.error("Error login:", error);
            throw error; // Bạn có thể xử lý lỗi ở đây theo cách phù hợp với ứng dụng của bạn
        }
    }
}

const authApi = new AuthAPIs();
export default authApi;