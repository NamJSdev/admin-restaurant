"use client";
import Card from "react-bootstrap/Card";
import useSWR, { Fetcher } from "swr";
import Link from "next/link";
import { ICustomer } from "@/app/types/backend";
import handleCustomers from "@/api/handleCustomer";
import { Skeleton } from "@/components/ui/skeleton";

const ViewDetailCustomer = ({ params }: { params: { id: string } }) => {
  const fetcher: Fetcher<ICustomer, string> = async (url: string) => {
    try {
      const response = await handleCustomers.getCustomers(url);
    //   console.log("Data from API:", response.data['0'].khachHangID); // Log data here
      return response.data['0'];
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };
  const { data, error, isLoading } = useSWR(
    `/KhachHang/HienThiKhachHang/${params.id}`, // Sử dụng đường dẫn đã cập nhật
    fetcher,
    {
      revalidateIfStale: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  if (isLoading) {
    return <Skeleton className="w-[100px] h-[20px] rounded-full" />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>No data available.</div>;
  }

  return (
    <Card>
      <Link href={"/customers"}>Go Back</Link>
      <Card.Header>Title : {data?.hoTen}</Card.Header>
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p> {data?.ngaySinh}. </p>
          <p> {data?.diaChi}. </p>
          <p>{params.id}</p>

          <p> {data?.sdt}. </p>
          <footer className="blockquote-footer">
            Author : <cite title="Source Title">{data?.hoTen}</cite>
          </footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
};

export default ViewDetailCustomer;
