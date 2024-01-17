"use client";
import {useState} from "react";
import {toast} from "react-toastify";
import {DialogContent, DialogHeader, DialogTitle} from "../ui/dialog";
import {Input, Button, Typography} from "@material-tailwind/react";
import handleFood from "@/api/handleFood";

interface CreateFoodOptionModalProps {
    reloadData: () => void;
}

function CreateFoodOptionModal({reloadData}: CreateFoodOptionModalProps) {
    const [isUploading, setIsUploadLoading] = useState(false);
    const [FoodOptionData, setFoodOptionData] = useState({
        tenLoaiMonAn: "",
    });
    const handleCreateFoodOption = async () => {
        setIsUploadLoading(true);
        try {
            await handleFood.addFoodOption(FoodOptionData);
            // gọi lại dữ liệu
            reloadData();
            setIsUploadLoading(false);
            toast.success("Thêm mới loại món ăn thành công!");
            setFoodOptionData({
                tenLoaiMonAn: "",
            });
        } catch (error) {
            console.error("Error adding food option:", error);
            toast.error("Thêm mới không thành công. Vui lòng thử lại.");
        }
    };
    return (
        <>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Thêm Mới Loại Món Ăn</DialogTitle>
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
                            placeholder="Nhập Loại Món Ăn"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900 "
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            value={FoodOptionData.tenLoaiMonAn}
                            onChange={(e) =>
                                setFoodOptionData({...FoodOptionData, tenLoaiMonAn: e.target.value})
                            }
                            required
                        />
                    </div>
                    <Button
                        type="button"
                        onClick={handleCreateFoodOption}
                        className="mt-6"
                        fullWidth
                    >
                        {isUploading ? "Đang thêm..." : "Thêm"}
                    </Button>
                </form>
            </DialogContent>
        </>
    );
}

export default CreateFoodOptionModal;
