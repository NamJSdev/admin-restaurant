"use client";
import {useState} from "react";
import {toast} from "react-toastify";
import {mutate} from "swr";
import {DialogContent, DialogHeader, DialogTitle} from "../ui/dialog";
import {Input, Button, Typography, ThemeProvider} from "@material-tailwind/react";
import handleFood from "@/api/handleFood";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import * as React from "react";
import value = ThemeProvider.propTypes.value;

interface CreateFoodModalProps {
    reloadData: () => void;
}

function CreateFoodModal({reloadData}: CreateFoodModalProps) {
    const [isUploading, setIsUploadLoading] = useState(false);
    const [foodData, setFoodData] = useState({
        loaiMonAnID: "",
        tenMon: "",
        moTa: "",
        giaTien: "",
        anhMonAn1URL: File,
    })
    const [apiFoodOptionData, setFoodOptionData] = useState([]);
    const getAllFoodOptitons = async () => {
        const api = "/LoaiMonAn/HienThiLoaiMonAn";
        try {
            const res = await handleFood.getFoodOption(api);
            if (res) {
                const foodOptionData = res.data;
                setFoodOptionData(foodOptionData);
            } else {
                console.log(`Food list option not found`);
            }
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu từ API:", error);
        }
    };
    React.useEffect(() => {
        getAllFoodOptitons();
    }, []);
    const handleValueChange = (value : string) => {
        setFoodData({...foodData, loaiMonAnID: value});
    };
    const handleCreateFood = async () => {
        setIsUploadLoading(true);
        try {
            if (!(foodData.anhMonAn1URL instanceof File)) {
                throw new Error("Invalid image file");
            }
            await handleFood.addFood(foodData);
            // gọi lại dữ liệu
            reloadData();
            setIsUploadLoading(false);
            toast.success("Thêm mới món ăn!");
            setFoodData({
                loaiMonAnID: "",
                tenMon: "",
                moTa: "",
                giaTien: "",
                anhMonAn1URL: File,
            });
        } catch (error) {
            console.error("Error adding chef:", error);
            toast.error("Thêm mới không thành công. Vui lòng thử lại.");
        }
    };
    // @ts-ignore
    return (
        <>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Thêm Mới Món Ăn</DialogTitle>
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
                        <Select onValueChange={handleValueChange}>
                            <SelectTrigger >
                                <SelectValue placeholder="Loại Món Ăn"/>
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    apiFoodOptionData.map((option) => (
                                        // eslint-disable-next-line react/jsx-key
                                        <SelectItem value={`${option.id}`}>{option.tenLoai}</SelectItem>
                                    ))
                                }
                            </SelectContent>
                        </Select>
                        <Typography
                            id="name"
                            variant="h6"
                            color="blue-gray"
                            className="-mb-3"
                        >
                            Tên Món Ăn
                        </Typography>
                        <Input
                            size="lg"
                            placeholder="Tên món ăn"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900 "
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            value={foodData.tenMon}
                            onChange={(e) =>
                                setFoodData({...foodData, tenMon: e.target.value})
                            }
                            required
                        />
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Mô tả
                        </Typography>
                        <Input
                            size="lg"
                            placeholder="Mô Tả món ăn"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            value={foodData.moTa}
                            onChange={(e) =>
                                setFoodData({...foodData, moTa: e.target.value})
                            }
                            required
                        />
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Giá tiền
                        </Typography>
                        <Input
                            size="lg"
                            placeholder="Giá tiền"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            value={foodData.giaTien}
                            onChange={(e) =>
                                setFoodData({...foodData, giaTien: e.target.value})
                            }
                            required
                        />

                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Ảnh món ăn
                        </Typography>
                        <Input
                            type="file"
                            size="lg"
                            placeholder="Tải lên ảnh món ăn"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900 "
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            onChange={(e) => {
                                const file = e.target.files && e.target.files[0];
                                if (file) {
                                    setFoodData({...foodData, anhMonAn1URL: file});
                                }
                            }}
                            required
                        />
                    </div>
                    <Button
                        type="button"
                        onClick={handleCreateFood}
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

export default CreateFoodModal;
