"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { mutate } from "swr";
import { DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import {
  Input,
  Button,
  Typography,
  ThemeProvider,
} from "@material-tailwind/react";
import handleFood from "@/api/handleFood";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as React from "react";
import value = ThemeProvider.propTypes.value;
import handleTales from "@/api/handleTable";

interface CreateFoodModalProps {
  reloadData: () => void;
}

function CreateTableModal({ reloadData }: CreateFoodModalProps) {
  const [isUploading, setIsUploadLoading] = useState(false);
  const [tableData, setTableData] = useState({
    loaiBanID: "",
    viTri: "",
    soBan: "",
    soNguoiToiDa: "",
    giaTien: "",
    moTa: "",
    hinhAnhBanURL: File,
    tinhTrangHienTai: "",
  });
  const [apiTableOptionData, setTableOptionData] = useState([]);
  const getAllTableOptitons = async () => {
    const api = "/LoaiBan/HienThiLoaiBan";
    try {   
        const res = await handleTales.getTableOption(api);
        if (res) {
            const apiData = res.data;
            setTableOptionData(apiData);
        } else {
            console.log(`Table Option list option not found`);
        }
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ API:", error);
    }
};
  React.useEffect(() => {
    getAllTableOptitons();
  }, []);
  const handleValueChange = (value: string) => {
    setTableData({ ...tableData, loaiBanID: value });
  };
  const handleCreateTable = async () => {
    setIsUploadLoading(true);
    try {
      if (!(tableData.hinhAnhBanURL instanceof File)) {
        throw new Error("Invalid image file");
      }
      await handleTales.addTable(tableData);
      // gọi lại dữ liệu
      reloadData();
      setIsUploadLoading(false);
      toast.success("Thêm mới bàn thành công!");
      setTableData({
        loaiBanID: "",
        viTri: "",
        soBan: "",
        soNguoiToiDa: "",
        giaTien: "",
        moTa: "",
        hinhAnhBanURL: File,
        tinhTrangHienTai: "",
      });
    } catch (error) {
      console.error("Error adding chef:", error);
      toast.error("Thêm mới không thành công. Vui lòng thử lại.");
    }
  };
  // @ts-ignore
  return (
    <>
      <DialogContent className="sm:max-w-[425px] h-screen overflow-auto">
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
              <SelectTrigger>
                <SelectValue placeholder="Loại Bàn" />
              </SelectTrigger>
              <SelectContent>
                {apiTableOptionData.map((option) => (
                  // eslint-disable-next-line react/jsx-key
                  <SelectItem value={`${option.loaiBanID}`}>
                    {option.tenLoaiBan}
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
              Số bàn
            </Typography>
            <Input
              size="lg"
              placeholder="Số Bàn"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900 "
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={tableData.soBan}
              onChange={(e) =>
                setTableData({ ...tableData, soBan: e.target.value })
              }
              required
            />
            <Typography
              id="name"
              variant="h6"
              color="blue-gray"
              className="-mb-3"
            >
              Số người tối đa
            </Typography>
            <Input
              size="lg"
              placeholder="Số Bàn"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900 "
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={tableData.soNguoiToiDa}
              onChange={(e) =>
                setTableData({ ...tableData, soNguoiToiDa: e.target.value })
              }
              required
            />
            <Typography
              id="name"
              variant="h6"
              color="blue-gray"
              className="-mb-3"
            >
              Vị trí
            </Typography>
            <Input
              size="lg"
              placeholder="Vị Trí"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900 "
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={tableData.viTri}
              onChange={(e) =>
                setTableData({ ...tableData, viTri: e.target.value })
              }
              required
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Mô tả
            </Typography>
            <Input
              size="lg"
              placeholder="Mô Tả Bàn"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={tableData.moTa}
              onChange={(e) =>
                setTableData({ ...tableData, moTa: e.target.value })
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
              value={tableData.giaTien}
              onChange={(e) =>
                setTableData({ ...tableData, giaTien: e.target.value })
              }
              required
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Tình trạng hiện tại
            </Typography>
            <Input
              size="lg"
              placeholder="Tình trạng bàn hiện tại"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={tableData.tinhTrangHienTai}
              onChange={(e) =>
                setTableData({ ...tableData, tinhTrangHienTai: e.target.value })
              }
              required
            />

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Ảnh bàn
            </Typography>
            <Input
              type="file"
              size="lg"
              placeholder="Tải lên ảnh bàn"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900 "
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={(e) => {
                const file = e.target.files && e.target.files[0];
                if (file) {
                  setTableData({ ...tableData, hinhAnhBanURL: file });
                }
              }}
              required
            />
          </div>
          <Button
            type="button"
            onClick={handleCreateTable}
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

export default CreateTableModal;
