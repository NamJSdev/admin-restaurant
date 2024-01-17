"use client";
import Card from "react-bootstrap/Card";
import useSWR, { Fetcher } from "swr";
import Link from "next/link";
import { IChef } from "@/app/types/backend";
import handleCustomers from "@/api/handleCustomer";
import { Skeleton } from "@/components/ui/skeleton";
import handleChefs from "@/api/handleChef";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";

const ViewDetailChef = ({ params }: { params: { id: string } }) => {
  const fetcher: Fetcher<IChef, string> = async (url: string) => {
    try {
      const response = await handleChefs.getChefs(url);
      return response.data['0'];
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };
  const { data, error, isLoading } = useSWR(
    `/DauBep/HienThiDanhSachDauBep/${params.id}`, // Sử dụng đường dẫn đã cập nhật
    fetcher,
    {
      revalidateIfStale: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  console.log(data)
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
      <Card.Header>Tên : {data?.hoTen}</Card.Header>
      <Card.Body>
        <blockquote className="blockquote mb-0">
        <Avatar className="capitalize">
          <AvatarImage src={data?.anhDauBepURl} />
        </Avatar>
          <p>Ngày sinh: {format(new Date(data?.ngaySinh), "dd/MM/yyyy")}</p>

          <p>Số điện thoại : {data?.sdt}. </p>
          <footer className="blockquote-footer">
            Tên : <cite title="Source Title">{data?.hoTen}</cite>
          </footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
};

export default ViewDetailChef;
