"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input, Button, Typography } from "@material-tailwind/react";
import { IFoodOption } from "@/app/types/backend";
import handleFood from "@/api/handleFood";
import handleTales from "@/api/handleTable";

interface UpDateTableOptionModalProps {
  id: number;
  reloadData: () => void;
}

function UpDateTableOptionModal(props: UpDateTableOptionModalProps) {
  const [isUploading, setIsUploadLoading] = useState(false);
  const { id, reloadData } = props;
  const [dataByID, setApiDataByID] = React.useState<IFoodOption[]>([]);
  const [isApiCalled, setIsApiCalled] = useState(false);
  const [TableOptionData, setTableOptionData] = useState({
    tenLoaiBan: "",
  });

  let ID = id;
  const getTableOptionByID = async (id: number) => {
    try {
      const res = await handleTales.getTableOption(
        `/LoaiBan/HienThiLoaiBan/${id}`
      );
      const dataByID = res.data[0].tenLoaiBan;
      setApiDataByID(dataByID);
      setTableOptionData({
        ...TableOptionData,
        tenLoaiBan: dataByID,
      });
    } catch (error) {
      console.error("Errot get table option by id", error);
    }
  };
  React.useEffect(() => {
    if (ID !== null) {
      getTableOptionByID(ID);
    }
  }, [ID]);
  const handleUpdate = async (id: number) => {
    setIsUploadLoading(true);
    try {
      await handleTales.upadateTableOption(TableOptionData, ID);
      // gọi lại dữ liệu
      reloadData();
      setIsUploadLoading(false);
      toast.success("Cập nhật thành công!");
      setTableOptionData({
        tenLoaiBan: "",
      });
    } catch (error) {
      console.error("Error adding table option:", error);
      toast.error("Cập nhật không thành công. Vui lòng thử lại.");
    }
  };
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
              Loại Bàn
            </Typography>
            <Input
              size="lg"
              placeholder="Tên loại món ăn"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900 "
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={TableOptionData.tenLoaiBan}
              onChange={(e) =>
                setTableOptionData({
                  ...TableOptionData,
                  tenLoaiBan: e.target.value,
                })
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

export default UpDateTableOptionModal;
