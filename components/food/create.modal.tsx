"use client";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "react-toastify";
import { mutate } from "swr";

interface IProps {
  showModalCreate: boolean;
  setShowModalCreate: (value: boolean) => void;
}
function CreateModal(props: IProps) {
  const { showModalCreate, setShowModalCreate } = props;

  const [hoTen, setName] = useState<string>("");
  const [ngaySinh, setBirthday] = useState<string>("");
  const [diaChi, setAddress] = useState<string>("");
  const [sdt, setPhone] = useState<string>("");
  const handleSubmit = () => {
    if (!hoTen) {
      toast.error("Not empty hoTen !...");
      return;
    }
    if (!ngaySinh) {
      toast.error("Not empty hoTen !...");
      return;
    }
    if (!diaChi) {
      toast.error("Not empty hoTen !...");
      return;
    }
    if (!sdt) {
      toast.error("Not empty hoTen !...");
      return;
    }
    fetch("http://localhost:8000/HienThiKhachHang", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ hoTen, ngaySinh, diaChi, sdt }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          toast.success("Create New Blog Success !...");
          handleClose();
          mutate<string>("http://localhost:8000/blogs");
        }
      });
    // console.log(">>> Check data",hoTen,ngaySinh,diaChi);
  };
  const handleClose = () => {
    setName("");
    setBirthday("");
    setAddress("");
    setPhone("");
    setShowModalCreate(false);
  };
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>Make changes to your profile here</DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input id="name" value="Pedro Duarte" className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="username" className="text-right">
            Username
          </Label>
          <Input id="username" value="@peduarte" className="col-span-3" />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Save changes</Button>
      </DialogFooter>
    </DialogContent>
  );
}

export default CreateModal;
