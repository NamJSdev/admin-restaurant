"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { mutate } from "swr";
import { DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input, Button, Typography } from "@material-tailwind/react";
import handleChefs from "@/api/handleChef";

interface CreateChefModalProps {
  reloadData: () => void;
}

function CreateChefModal({reloadData}: CreateChefModalProps) {
  const [isUploading, setIsUploadLoading] = useState(false);
  const [chefData, setChefData] = useState({
    hoTen: "",
    ngaySinh: "",
    sdt: "",
    moTa: "",
    anhDauBepURl: File,
  });
  const handleCreateChef = async () => {
    setIsUploadLoading(true);
    try {
      if (!(chefData.anhDauBepURl instanceof File)) {
        throw new Error("Invalid image file");
      }
      await handleChefs.addChef(chefData);
      // gọi lại dữ liệu
      reloadData();
      setIsUploadLoading(false);
      toast.success("Thêm mới đầu bếp thành công!");
      setChefData({
        hoTen: "",
        ngaySinh: "",
        sdt: "",
        moTa: "",
        anhDauBepURl: File
      });
    } catch (error) {
      console.error("Error adding chef:", error);
      toast.error("Thêm mới không thành công. Vui lòng thử lại.");
    }
  };
  return (
    <>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Thêm Mới Đầu Bếp</DialogTitle>
        </DialogHeader>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography
              id="name"
              variant="h6"
              color="blue-gray"
              className="-mb-3"
            >
              Họ Tên
            </Typography>
            <Input
              size="lg"
              placeholder="Nhập họ tên"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900 "
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={chefData.hoTen}
              onChange={(e) =>
                setChefData({ ...chefData, hoTen: e.target.value })
              }
              required
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Ngày Sinh
            </Typography>
            <Input
              type="date"
              size="lg"
              placeholder="Nhập ngày sinh"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={chefData.ngaySinh}
              onChange={(e) =>
                setChefData({ ...chefData, ngaySinh: e.target.value })
              }
              required
            />

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Số điện thoại
            </Typography>
            <Input
              min={0}
              type="tel"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              size="lg"
              placeholder="Nhập số điện thoại"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={chefData.sdt}
              onChange={(e) =>
                setChefData({ ...chefData, sdt: e.target.value })
              }
              required
            />

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Mô tả
            </Typography>
            <Input
              size="lg"
              placeholder="Nhập giới thiệu"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={chefData.moTa}
              onChange={(e) =>
                setChefData({ ...chefData, moTa: e.target.value })
              }
              required
            />

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Ảnh
            </Typography>
            <Input
              type="file"
              size="lg"
              placeholder="Tải lên ảnh đầu bếp"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900 "
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={(e) => {
                const file = e.target.files && e.target.files[0];
                if (file) {
                  setChefData({ ...chefData, anhDauBepURl: file });
                }
              }}
              required
            />
          </div>
          <Button
            type="button"
            onClick={handleCreateChef}
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

export default CreateChefModal;
