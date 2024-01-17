"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { mutate } from "swr";
import { DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input, Button, Typography, useAccordion } from "@material-tailwind/react";
import handleChefs from "@/api/handleChef";
import { IChef, IFood } from "@/app/types/backend";
import { value } from "@material-tailwind/react/types/components/chip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import handleFoods from "@/api/handleFood";

interface UpDateFoodModalProps {
  id: number;
  reloadData: () => void;
}

function UpDateFoodModal(props: UpDateFoodModalProps) {
  const [isUploading, setIsUploadLoading] = useState(false);
  const [apiFoodOptionData, setFoodOptionData] = useState([]);
  const [valueDefault, setValueDefault] = useState('');
  const { id, reloadData } = props;
  const [dataByID, setApiDataByID] = React.useState<IFood[]>([]);
  const ID = id;
  const [foodData, setFoodData] = useState({
    loaiMonAnID: "",
    tenMon: "",
    moTa: "",
    giaTien: "",
    anhMonAn1URL: File,
  });

  const getAllFoodOptitons = async () => {
    const api = "/LoaiMonAn/HienThiLoaiMonAn";
    try {
      const res = await handleFoods.getFoodOption(api);
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
  const getFoodByID = async (id: number) => {
    const api = `/MonAn/HienThiMonAn/${id}`;
    try {
      const res = await handleFoods.getFoods(api);
      if (res) {
        const dataByID = res.data[0];
        setApiDataByID(dataByID);
        setFoodData({
          ...foodData,
          tenMon: dataByID.tenMon,
          moTa: dataByID.moTa,
          giaTien: dataByID.giaTien,
          loaiMonAnID: dataByID.loaiMonAnID,
        });
      } else {
        console.log(`Food not found`);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu từ API:", error);
    }
  };
  React.useEffect(() => {
    if (ID !== null) {
      getFoodByID(ID);
    }
  }, [ID]);
  const handleValueChange = (value: string) => {
    setFoodData({ ...foodData, loaiMonAnID: value });
  };
  const handleUpdate = async () => {
    setIsUploadLoading(true);
    console.log(ID);
    try {
      await handleFoods.updateFood(foodData, ID);
      // gọi lại dữ liệu
      reloadData();
      setIsUploadLoading(false);
      toast.success("Cập nhật thành công!");
      setFoodData({
        loaiMonAnID: "",
        tenMon: "",
        moTa: "",
        giaTien: "",
        anhMonAn1URL: File,
      });
    } catch (error) {
      console.error("Error adding food option:", error);
      toast.error("Cập nhật không thành công. Vui lòng thử lại.");
    }
  };
  return (
    <>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cập nhật món ăn</DialogTitle>
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
            <Select onValueChange={handleValueChange} defaultValue={`${foodData.loaiMonAnID}`}>
              <SelectTrigger>
                <SelectValue placeholder="Loại Món Ăn" />
              </SelectTrigger>
              <SelectContent>
                {apiFoodOptionData.map((option) => (
                  // eslint-disable-next-line react/jsx-key
                  <SelectItem value={`${option.id}`}>
                    {option.tenLoai}
                  </SelectItem>
                ))}
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
                setFoodData({ ...foodData, tenMon: e.target.value })
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
                setFoodData({ ...foodData, moTa: e.target.value })
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
                setFoodData({ ...foodData, giaTien: e.target.value })
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
                  setFoodData({ ...foodData, anhMonAn1URL: file });
                }
              }}
              required
            />
          </div>
          <Button
            type="button"
            onClick={handleUpdate}
            className="mt-6"
            fullWidth
          >
            {isUploading ? "Đang Cập Nhật..." : "Cập Nhật"}
          </Button>
        </form>
      </DialogContent>
    </>
  );
}

export default UpDateFoodModal;
