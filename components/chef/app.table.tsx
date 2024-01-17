"use client";
import * as React from "react";
import { format } from "date-fns";
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
import { IChef } from "@/app/types/backend";
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
import handleChefs from "@/api/handleChef";
import { Avatar, AvatarImage } from "../ui/avatar";
import CreateChefModal from "./create.modal";
import UpDateChefModal from "./update.modal";

export function DataChefTable() {
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
  const [rowsPerPage] = React.useState<number>(8); // Số lượng hàng mỗi trang
  const [filteredData, setFilteredData] = React.useState<IChef[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [apiData, setApiData] = React.useState<IChef[]>([]);
  const [selectedChefId, setSelectedChefId] = React.useState<number | null>(
    null
  );
  const [chef, setchef] = React.useState<IChef | null>(null);

  // Hàm tìm kiếm
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset trang về 1 khi thực hiện tìm kiếm
  };

  const getAllChefs = async () => {
    const api = "/DauBep/HienThiDanhSachDauBep";
    try {
      setIsLoading(true);
      const res = await handleChefs.getChefs(api);
      if (res) {
        const apiData = res.data;
        setApiData(apiData);
      } else {
        console.log(`chef list not found`);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu từ API:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const HandleDelete = async (id: number) => {
    try {
      const res = await handleChefs.deleteChef(`/DauBep/XoaDauBep/${id}`);
      if (res) {
        toast.error("Xóa thành công!...");
        getAllChefs();
      }
    } catch (error) {
      console.error("Error deleting chef:", error);
    }
  };

  React.useEffect(() => {
    getAllChefs();
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
    .sort((a, b) => b.id - a.id);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = filteredAndSortedData.slice(startIndex, endIndex);

  const columns: ColumnDef<IChef>[] = [
    {
      accessorKey: "anhDauBepURl",
      header: "Ảnh",
      cell: ({ row }) => (
        <Avatar className="capitalize">
          <AvatarImage src={row.getValue("anhDauBepURl")} />
        </Avatar>
      ),
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
        <div className="capitalize">
          {format(new Date(row.getValue("ngaySinh")), "dd/MM/yyyy")}
        </div>
      ),
    },
    {
      accessorKey: "sdt",
      header: "Số Điện Thoại",
      cell: ({ row }) => (
          <div className="capitalize">
            <div className="capitalize">{row.getValue("sdt")}</div>
          </div>
      ),
    },
    {
      accessorKey: "moTa",
      header: "Chức Vụ",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("moTa")}</div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const chef = row.original;
        return (
          <>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="secondary"
                  className="mx-3"
                  onClick={() => setSelectedChefId(chef.id)}
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </Button>
              </DialogTrigger>
              <UpDateChefModal reloadData={getAllChefs} />
            </Dialog>
            <Button variant="destructive" onClick={() => HandleDelete(chef.id)}>
              <FontAwesomeIcon icon={faTrash} />
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
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary" className="ml-4">
              Thêm Mới
            </Button>
          </DialogTrigger>
          <CreateChefModal reloadData={getAllChefs} />
        </Dialog>
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
