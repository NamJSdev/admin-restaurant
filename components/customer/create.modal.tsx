"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { mutate } from "swr";
import { DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input, Button, Typography } from "@material-tailwind/react";
interface IProps {
  showModalCreate: boolean;
  setShowModalCreate: (value: boolean) => void;
}
function CreateModal(props: IProps) {
  const { showModalCreate, setShowModalCreate } = props;

  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const handleSubmit = () => {
    if (!title) {
      toast.error("Not empty title !...");
      return;
    }
    if (!author) {
      toast.error("Not empty title !...");
      return;
    }
    if (!content) {
      toast.error("Not empty title !...");
      return;
    }
    fetch("http://localhost:8000/blogs", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, author, content }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          toast.success("Create New Blog Success !...");
          handleClose();
          mutate<string>("http://localhost:8000/blogs");
        }
      });
    // console.log(">>> Check data",title,author,content);
  };
  const handleClose = () => {
    setTitle("");
    setAuthor("");
    setContent("");
    setShowModalCreate(false);
  };
  return (
    <>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Thêm Mới Khách Hàng</DialogTitle>
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
              required
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Địa Chỉ
            </Typography>
            <Input
              size="lg"
              placeholder="Nhập địa chỉ"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
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
              required
            />
          </div>
          <Button type="submit" className="mt-6" fullWidth>
            Thêm
          </Button>
        </form>
      </DialogContent>
    </>
  );
}

export default CreateModal;
