'use client'

import React, {useState} from "react";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";
import Link from "next/link";
import authApi from "@/api/auth";

const verifyMail: React.FC = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [email, setEmail] = useState("")
    const defaultObjValidInput = {
        isValidValueMail: true,
    };
    const [objValidInput, setObjValidInput] =
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useState(defaultObjValidInput);
    const handleEmail = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Ngăn chặn sự kiện mặc định của form
        setObjValidInput(defaultObjValidInput);
        if (!email) {
            setObjValidInput({
                ...defaultObjValidInput,
                isValidValueMail: false,
            });
            toast.error("Nhập email của bạn !");
            return;
        }
        const response = await authApi.verifyMail(email);
        if (response.code === 404) {
            toast.error('Email không tồn tại !')
            return;
        }
        if (response.code === 200) {
            toast.success('Đã gửi mã xác thực, vui lòng check Mail của bạn !')
            router.push("/changePass");
            return;
        }
    }
    return (
        <section className="ftco-section">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 text-center mb-5">
                        <h2 className="heading-section">Xác thực Email</h2>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-4">
                        <div className="login-wrap p-0">
                            <form className="signin-form" onSubmit={handleEmail}>
                                <div className="form-group">
                                    <input
                                        type="email"
                                        className={
                                            objValidInput.isValidValueMail
                                                ? "form-control"
                                                : "is-invalid form-control"
                                        }
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <button
                                        type="submit"
                                        className="form-control btn btn-primary submit px-3"
                                    >
                                        Xác minh
                                    </button>
                                </div>
                                <div className="form-group d-md-flex">
                                    <div className="w-100">
                                        <label className="checkbox-wrap checkbox-primary mr-4 text-center"> <Link href="/login">Đăng Nhập Tài Khoản</Link></label>
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
export default verifyMail