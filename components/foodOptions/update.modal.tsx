"use client";
import React, {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {DialogContent, DialogHeader, DialogTitle} from "../ui/dialog";
import {Input, Button, Typography} from "@material-tailwind/react";
import {IFoodOption} from "@/app/types/backend";
import handleFood from "@/api/handleFood";

interface UpDateFoodOptionModalProps {
    id: number;
    reloadData: () => void;
}

function UpDateFoodOptionModal(props: UpDateFoodOptionModalProps) {
    const [isUploading, setIsUploadLoading] = useState(false);
    const {id, reloadData} = props
    const [dataByID, setApiDataByID] = React.useState<IFoodOption[]>([]);

    const ID = id
    const [FoodOptionData, setFoodOptionData] = useState({
        tenLoai: "",
    });
    const getFoodOptionByID = async () => {
        try {
            const res = await handleFood.getFoodOption(`/LoaiMonAn/HienThiLoaiMonAn/${id}`);
            const dataByID = res.data;
            setApiDataByID(dataByID);
        } catch (error) {
            console.error("Errot get food option by id", error)
        }
    };
    const handleUpdate = async () => {
        setIsUploadLoading(true)
        try {
            await handleFood.upadateFoodOption(FoodOptionData,ID)
            // gọi lại dữ liệu
            reloadData();
            setIsUploadLoading(false);
            toast.success("Cập nhật thành công!");
            setFoodOptionData({
                tenLoai: "",
            });
        } catch (error) {
            console.error("Error adding food option:", error);
            toast.error("Cập nhật không thành công. Vui lòng thử lại.");
        }

    }
    return (
        <>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Chỉnh sửa thông tin</DialogTitle>
                </DialogHeader>
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                    <div className="mb-1 flex flex-col gap-6">
                        <Typography
                            id="name"
                            variant="h6"
                            color="blue-gray"
                            className="-mb-3"
                        >
                            Loại Món Ăn
                        </Typography>
                        <Input
                            size="lg"
                            placeholder="Tên loại món ăn"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900 "
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            value={FoodOptionData.tenLoai}
                            onChange={(e) =>
                                setFoodOptionData({...FoodOptionData, tenLoai: e.target.value})
                            }
                            required
                        />
                    </div>
                    <Button
                        type="button"
                        className="mt-6"
                        fullWidth
                        onClick={handleUpdate}
                    >
                        {isUploading ? "Đang cập nhật..." : "Cập nhật"}
                    </Button>
                </form>
            </DialogContent>
        </>
    );
}

export default UpDateFoodOptionModal;
