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
import handleCustomers from "@/api/handleCustomer";

interface CreateBillModalProps {
  reloadData: () => void;
}

function CreateBillModal({ reloadData }: CreateBillModalProps) {
  const [isUploading, setIsUploadLoading] = useState(false);
  const [tableData, setTableData] = useState({
    loaiBanID: "",
  });
  const [apiTableOptionData, setTableOptionData] = useState([]);
  const [dataToPhone, setDataToPhone] = useState("");
  const [customerData, setCustomerData] = useState({
    khachHangID: "",
    hoTen: "",
    phoneNumber: "",
  });
  const [valueCustomer, setValueCustomer] = useState([]);
  //Lấy ra list bàn trống hiện tại
  const getCustomerByPhoneNumber = async (phone: string) => {
    try {
      const res = await handleCustomers.getCustomerByPhone(phone);
      const valueCustomer = res[0];
      setValueCustomer(valueCustomer);
      console.log(valueCustomer.hoTen);
      setCustomerData({
        ...valueCustomer,
        khachHangID: valueCustomer.khachHangID,
        hoTen: valueCustomer.hoTen,
      });
      toast.success(`Tìm thấy thông tin khách hàng: ${valueCustomer.hoTen}`)
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu từ API:", error);
    }
  };
  const getAllTableOptitons = async () => {
    const api = "/datBan/HienThiTatCaBanTrong";
    try {
      const res = await handleTales.getTables(api);
      if (res) {
        const apiTableOptionData = res;
        setTableOptionData(apiTableOptionData);
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
  return (
    <>
      <DialogContent className="sm:max-w-[90%]">
        <DialogHeader>
          <DialogTitle>Tạo Hóa Đơn</DialogTitle>
        </DialogHeader>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography
              id="name"
              variant="h6"
              color="blue-gray"
              className="-mb-3"
            >
              Danh sách bàn trống
            </Typography>
            <Select onValueChange={handleValueChange}>
              <SelectTrigger>
                <SelectValue placeholder="DS Bàn Trống" />
              </SelectTrigger>
              <SelectContent>
                {apiTableOptionData.map((option) => (
                  // eslint-disable-next-line react/jsx-key
                  <SelectItem value={`${option.banID}`}>
                    Bàn số {option.soBan}
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
              Nhập Số Điện Thoại Khách Hàng
            </Typography>
            <Input
              size="lg"
              placeholder="Nhập Số Điện Thoại"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={customerData.phoneNumber}
              onChange={(e) =>
                setCustomerData({
                  ...customerData,
                  phoneNumber: e.target.value,
                })
              }
              required
            />
            <Button
              variant="destructive"
              onClick={() => getCustomerByPhoneNumber(customerData.phoneNumber)}
            >
              Thêm Khách Hàng
            </Button>
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Khách Hàng
            </Typography>
            <Input
              size="lg"
              placeholder="Khách Hàng"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={valueCustomer.hoTen}
              readOnly
              required
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Mô Tả
            </Typography>
            <Input
              size="lg"
              placeholder="Mô Tả"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              //   value={foodData.moTa}
              //   onChange={(e) =>
              //     setFoodData({ ...foodData, moTa: e.target.value })
              //   }
              required
            />
          </div>
          <Button
            type="button"
            // onClick={handleCreateFood}
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

export default CreateBillModal;
