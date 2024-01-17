"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { mutate } from "swr";
import { DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input, Button, Typography } from "@material-tailwind/react";
import handleChefs from "@/api/handleChef";
import { IChef } from "@/app/types/backend";
import { value } from "@material-tailwind/react/types/components/chip";

interface UpDateChefModalProps {
  chef : IChef | null;
  setChef:(value: IChef | null) => void
  reloadData: () => void;
}

function UpDateChefModal(props: UpDateChefModalProps) {
    const {reloadData,chef,setChef} = props;
  const [isUploading, setIsUploadLoading] = useState(false);
  const [id, setId] = useState<number>(0);
    const [hoTen,setName] = useState<string>("");
    const [anhDauBepURl,setImage] = useState<string>("");
    const [ngaySinh,setDate] = useState<string>("");
    const [moTa,setDes] = useState<string>("");
    const [sdt,setPhone] = useState<string>("");

  useEffect(()=>{
    if(chef && chef.id){
        setId(chef.id);
        setName(chef.hoTen);
        setImage(chef.anhDauBepURl);
        setDate(chef.ngaySinh);
        setDes(chef.moTa);
        setPhone(chef.sdt);
    }
  },[chef])

  
//   React.useEffect(() => {
//     const fetchChefData = async () => {
//       try {
//         const response = await handleChefs.getChefs(
//           `/DauBep/HienThiDanhSachDauBep/${chefId}`
//         );
//         const chef = response.data;
//         setChefData({
//           hoTen: chef.hoTen,
//           ngaySinh: chef.ngaySinh,
//           sdt: chef.sdt,
//           moTa: chef.moTa,
//           anhDauBepURl: chef.anhDauBepURl,
//         });
//       } catch (error) {
//         console.error("Error fetching chef data:", error);
//       }
//     };

//     fetchChefData();
//   }, [chefId]);

//   const handleUpdateChef = async () => {
//     setIsUploadLoading(true);
//     try {
//       if (!(chefData.anhDauBepURl instanceof File)) {
//         throw new Error("Invalid image file");
//       }
//       await handleChefs.updateChef(`/DauBep/SuaDauBep/${chefId}`, chefData);
//       // Gọi lại hàm reloadData để cập nhật dữ liệu
//       reloadData();
//       setIsUploadLoading(false);
//       toast.success("Cập nhật đầu bếp thành công!");
//     } catch (error) {
//       console.error("Error updating chef:", error);
//       toast.error("Cập nhật không thành công. Vui lòng thử lại.");
//     }
//   };
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
              Họ Tên
            </Typography>
            <Input
              size="lg"
              placeholder="Nhập họ tên"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900 "
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={hoTen}
              onChange={(e)=>setName(e.target.value)}
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
              value={ngaySinh}
              onChange={(e)=>setDate(e.target.value)}
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
              value={sdt}
              onChange={(e)=>setPhone(e.target.value)}
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
              value={moTa}
              onChange={(e)=>setDes(e.target.value)}
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
                  setImage(file);
                }
              }}
              required
            />
          </div>
          <Button
            type="button"
            className="mt-6"
            fullWidth
          >
            {isUploading ? "Đang cập nhật..." : "Cập nhật"}
          </Button>
        </form>
      </DialogContent>
    </>
  );
}

export default UpDateChefModal;
