'use client'

import React, {useState} from "react";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";
import Link from "next/link";
import authApi from "@/api/auth";

const changePassword: React.FC = () => {
    const router = useRouter();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [codeActive, setCode] = useState("")
    const [password, setPassword] = useState("")
    const defaultObjValidInput = {
        isValidValueCode: true,
        isValidValuePassword: true,
    };
    const [objValidInput, setObjValidInput] =
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useState(defaultObjValidInput);
    const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Ngăn chặn sự kiện mặc định của form
        setObjValidInput(defaultObjValidInput);
        if (!codeActive) {
            setObjValidInput({
                ...defaultObjValidInput,
                isValidValueCode: false,
            });
            toast.error("Nhập mã xác thực!");
            return;
        }
        if (!password) {
            setObjValidInput({
                ...defaultObjValidInput,
                isValidValuePassword: false,
            });
            toast.error("Nhập mật khẩu mới!");
            return;
        }
        const response = await authApi.changePass(codeActive, password);

        if (response.code === 400) {
            toast.error('Mã xác minh chưa chính xác hoặc hết hạn !')
            return;
        }
        if (response.code === 200) {
            toast.success('Đổi mật khẩu mới thành công !')
            router.push("/login");
            return;
        }
    }
    return (
        <section className="ftco-section">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 text-center mb-5">
                        <h2 className="heading-section">Đặt Lại Mật Khẩu</h2>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-4">
                        <div className="login-wrap p-0">
                            <form className="signin-form" onSubmit={handleChangePassword}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className={
                                            objValidInput.isValidValueCode
                                                ? "form-control"
                                                : "is-invalid form-control"
                                        }
                                        placeholder="Mã xác thực"
                                        value={codeActive}
                                        onChange={(e) => setCode(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className={
                                            objValidInput.isValidValuePassword
                                                ? "form-control"
                                                : "is-invalid form-control"
                                        }
                                        placeholder="Mật khẩu mới"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <button
                                        type="submit"
                                        className="form-control btn btn-primary submit px-3"
                                    >
                                        Đổi mật khẩu
                                    </button>
                                </div>
                                <div className="form-group d-md-flex">
                                    <div className="w-100">
                                        <label className="checkbox-wrap checkbox-primary mr-4 text-center"> <Link
                                            href="/login">Đăng Nhập Tài Khoản</Link></label>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default changePassword