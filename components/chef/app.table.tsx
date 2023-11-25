"use client";
import * as React from "react";
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
import { ArrowUpDown, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { ICustomer } from "@/app/types/backend";
import { Skeleton } from "@/components/ui/skeleton";

import CreateModal from "./create..modal";
import { toast } from "react-toastify";
import { mutate } from "swr";
import { Dialog, DialogTrigger } from "../ui/dialog";

export const columns: ColumnDef<ICustomer>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "hoTen",
    header: "Họ Tên",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("hoTen")}</div>
    ),
  },
  {
    accessorKey: "ngaySinh",
    header: "Ngày Sinh",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("ngaySinh")}</div>
    ),
  },
  {
    accessorKey: "diaChi",
    header: "Địa Chỉ",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("diaChi")}</div>
    ),
  },
  {
    accessorKey: "sdt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Số Điện Thoại
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("sdt")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const customer = row.original;
      const HandleDelete = (id: number) => {
        fetch(`http://localhost:8000/HienThiKhachHang/${id}`, {
          method: "DELETE",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((res) => {
            if (res) {
              toast.error("Delete Success !...");
              mutate<string>("http://localhost:8000/HienThiKhachHang");
            }
          });
      };
      return (
        <>
          <Link
            className={"btn btn-primary"}
            href={`/customers/${customer.khachHangID}`}
          >
            <Button>
              <FontAwesomeIcon icon={faEye} />
            </Button>
          </Link>
          <Button variant="secondary" className="mx-3">
            <FontAwesomeIcon icon={faPenToSquare} />
          </Button>
          <Button
            variant="destructive"
            onClick={() => HandleDelete(customer.khachHangID)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </>
      );
    },
  },
];
export function DataChefTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);
  const [apiData, setApiData] = React.useState<ICustomer[]>([]);
  const [showModalCreate, setShowModalCreate] = React.useState<boolean>(false);
  React.useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        setIsLoading(true); // Bắt đầu loading khi bắt đầu gọi API
        const response = await fetch("http://localhost:8000/HienThiKhachHang"); // Thay 'URL_API' bằng đường dẫn của API thực tế
        const apiData = await response.json();
        setApiData(apiData);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ API:", error);
      } finally {
        setIsLoading(false); // Kết thúc loading sau khi gọi API xong (hoặc xảy ra lỗi)
      }
    };

    fetchDataFromAPI();
  }, []);

  const table = useReactTable({
    data: apiData,
    columns,
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
          placeholder="Tìm kiếm theo SĐT..."
          value={(table.getColumn("sdt")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("sdt")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="secondary"
              className="ml-4"
              onClick={() => setShowModalCreate(true)}
            >
              Thêm Mới
            </Button>
          </DialogTrigger>
          <CreateModal
            showModalCreate={showModalCreate}
            setShowModalCreate={setShowModalCreate}
          />
        </Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Hiển Thị <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
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
                {isLoading ? ( // Kiểm tra trạng thái loading để hiển thị thông báo
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
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} trên{" "}
          {table.getFilteredRowModel().rows.length} hàng được lựa chọn.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Trang Trước
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Trang Sau
          </Button>
        </div>
      </div>
    </div>
  );
}
