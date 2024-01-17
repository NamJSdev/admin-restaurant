"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrash,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { IFood, IBill } from "@/app/types/backend";
import { Skeleton } from "@/components/ui/skeleton";

import { toast } from "react-toastify";

import { Dialog, DialogTrigger } from "../ui/dialog";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import handleFood from "@/api/handleFood";
import CreateFoodOptionModal from "@/components/foodOptions/create.modal";
import UpDateFoodOptionModal from "@/components/foodOptions/update.modal";
import { useRef } from "react";
import handleBills from "@/api/handleBill";
import { error } from "console";
import CreateBillModal from "./create.modal";

export function DataBillTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [searchTerm, setSearchTerm] = React.useState("");

  // Thêm state cho trang hiện tại
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [rowsPerPage] = React.useState<number>(6); // Số lượng hàng mỗi trang
  const [filteredData, setFilteredData] = React.useState<IBill[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [apiData, setApiData] = React.useState<IBill[]>([]);
  const [billOption, setBillOption] = React.useState<IBill | null>(null);
  const [selectedBillOptionId, setSelectedBillOptionId] = React.useState<
    number | null
  >(null);
  // Hàm tìm kiếm
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset trang về 1 khi thực hiện tìm kiếm
  };
  const getAllBills = async () => {
    const api = "/HoaDonAdmin/HienThiHoaDon";
    try {
      setIsLoading(true);
      const res = await handleBills.getBills(api);
      if (res) {
        const apiData = res.data;
        setApiData(apiData);
      } else {
        console.log(`Bill list option not found`);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu từ API:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const HandleDelete = async (id: number) => {
    try {
      const res = await handleFood.deleteFoodOption(
        `/HoaDonAdmin/XoaHoaDon/${id}`
      );
      if (res) {
        toast.error("Xóa thành công!...");
        getAllBills();
      }
    } catch (error) {
      console.error("Error deleting bill:", error);
    }
  };

  const HandleVerifyBill = async (id: number) => {
    try {
      const res = await handleBills.verifyBill(
        `/HoaDonAdmin/CapNhatThongTinHoaDonAdmin/${id}`
      );
      if(res){
        toast.success("Xác nhận hóa đơn thành công!");
        getAllBills();
      }
    } catch (error) {
      console.error("Error verify bill:", error);
    }
  };
  React.useEffect(() => {
    getAllBills();
  }, []);
  React.useEffect(() => {
    // Tìm kiếm dữ liệu ở đây và cập nhật state tương ứng
    const filteredData = apiData.filter((item) =>
      Object.values(item).some(
        (field) =>
          typeof field === "string" &&
          field.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredData(filteredData);
  }, [apiData, searchTerm]);
  const filteredAndSortedData = filteredData
    .slice()
    .sort((a, b) => b.hoaDonID - a.hoaDonID);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = filteredAndSortedData.slice(startIndex, endIndex);

  const columns: ColumnDef<IBill>[] = [
    {
      accessorKey: "tenKhachHang",
      header: "Khách Hàng",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("tenKhachHang")}</div>
      ),
    },
    {
      accessorKey: "soBan",
      header: "Bàn",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("soBan")}</div>
      ),
    },
    {
      accessorKey: "tongTien",
      header: "Tổng Tiền",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("tongTien")} VNĐ</div>
      ),
    },
    {
      accessorKey: "thoiGianBatDauThucTe",
      header: "Ngày Tạo",
      cell: ({ row }) => (
        <div className="capitalize">
          {format(
            new Date(row.getValue("thoiGianBatDauThucTe")),
            "hh:mm - dd/MM/yyyy"
          )}
        </div>
      ),
    },
    {
      accessorKey: "trangThaiHoaDon",
      header: "Trạng Thái Hóa Đơn",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("trangThaiHoaDon")}</div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const bill = row.original;
        return (
          <>
            <Dialog>
              <DialogTrigger asChild>
                {/*<Button*/}
                {/*  variant="secondary"*/}
                {/*  className="mx-3"*/}
                {/*  onClick={() => setSelectedBillOptionId(bill.hoaDonID)}*/}
                {/*>*/}
                {/*  <FontAwesomeIcon icon={faPenToSquare} />*/}
                {/*</Button>*/}
              </DialogTrigger>
              {/* <UpDateFoodOptionModal
                                reloadData={getAllFoodOptitons}
                                id={selectedFoodOptionId}></UpDateFoodOptionModal> */}
            </Dialog>
            <Button
              variant="destructive"
              onClick={() => HandleDelete(bill.hoaDonID)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>

            <Button
              title="Xác thực"
              className="ml-3"
              variant="outline"
              onClick={() => HandleVerifyBill(bill.hoaDonID)}
            >
              <FontAwesomeIcon className="text-lime-400" icon={faCircleCheck} />
            </Button>
          </>
        );
      },
    },
  ];

  const table = useReactTable({
    data: paginatedData,
    columns,
    manualPagination: true,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Tìm kiếm..."
          value={searchTerm}
          onChange={(event) => {
            handleSearch(event.target.value);
            setCurrentPage(1);
          }}
          className="max-w-sm"
        />
        {/* <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary" className="ml-4">
              Thêm Hóa Đơn
            </Button>
          </DialogTrigger> */}
          {/* <CreateBillModal reloadData={getAllBills}/> */}
        {/* </Dialog> */}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                {isLoading ? (
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    <Skeleton className="w-[100px] h-[20px] rounded-full" />
                  </TableCell>
                ) : (
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    Không Tìm Thấy Thông Tin.
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Trang Trước
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(prev + 1, Math.ceil(apiData.length / rowsPerPage))
              )
            }
            disabled={currentPage === Math.ceil(apiData.length / rowsPerPage)}
          >
            Trang Sau
          </Button>
        </div>
      </div>
    </div>
  );
}
