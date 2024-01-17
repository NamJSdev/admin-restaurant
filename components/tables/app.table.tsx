'use client'

import * as React from "react";
import {Button} from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {Input} from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faEye,
    faPenToSquare,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import {ITable} from "@/app/types/backend";
import {Skeleton} from "@/components/ui/skeleton";

import {toast} from "react-toastify";

import {Dialog, DialogTrigger} from "../ui/dialog";
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
import {Avatar, AvatarImage} from "../ui/avatar";
import handleFood from "@/api/handleFood";
import CreateFoodModal from "@/components/food/create.modal";
import {useState} from "react";
import handleTales from "@/api/handleTable";
import CreateTableModal from "./create.modal";
import { ArrowUpDown } from "lucide-react";

export function DataFoodOptionTable() {
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
    const [filteredData, setFilteredData] = React.useState<ITable[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [apiData, setApiData] = React.useState<ITable[]>([]);
    const [selectedFoodId, setSelectedFoodId] = React.useState<number | null>(
        null
    );
    const [food, setfood] = React.useState<ITable | null>(null);
    const [apiFoodOptionData, setFoodOptionData] = useState('');
    const [foodOptionFilter, setFoodOptionFilter] = useState<string>('');

    // Hàm tìm kiếm
    const handleSearch = (value: string) => {
        setSearchTerm(value);
        // setFoodOptionFilter(''); // Reset bộ lọc khi tìm kiếm
        // setCurrentPage(1); // Reset trang về 1 khi thực hiện tìm kiếm
    };
    // const getAllFoodOptitons = async () => {
    //     const api = "/LoaiMonAn/HienThiLoaiMonAn";
    //     try {
    //         const res = await handleFood.getFoodOption(api);
    //         if (res) {
    //             const foodOptionData = res.data;
    //             setFoodOptionData(foodOptionData);
    //         } else {
    //             console.log(`Food list option not found`);
    //         }
    //     } catch (error) {
    //         console.error("Lỗi khi lấy dữ liệu từ API:", error);
    //     }
    // };
    const getAllTables = async () => {
        const api = "/Ban/HienThiBan";
        try {
            setIsLoading(true);
            const res = await handleTales.getTables(api);
            if (res) {
                const apiData = res.data;
                setApiData(apiData);
            } else {
                console.log(`Table list not found`);
            }
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu từ API:", error);
        } finally {
            setIsLoading(false);
        }
    };
    // const handleValueChange = (value: string) => {
    //     setFoodOptionFilter(value === '0' ? '' : value);
    //     setCurrentPage(1);
    // };

    const HandleDelete = async (id: number) => {
        try {
            const res = await handleTales.deleteTable(`/Ban/XoaBan/${id}`);
            if (res) {
                toast.error("Xóa thành công!...");
                getAllTables();
            }
        } catch (error) {
            console.error("Error deleting chef:", error);
        }
    };

    React.useEffect(() => {
        getAllTables();
        // getAllFoodOptitons();
    }, []);

    // React.useEffect(() => {
    //     // Tìm kiếm dữ liệu ở đây và cập nhật state tương ứng
    //     const filteredData = apiData.filter((item) =>
    //         (foodOptionFilter === '' || item.loaiMonAnID === parseInt(foodOptionFilter)) &&
    //         Object.values(item).some(
    //             (field) =>
    //                 typeof field === "string" &&
    //                 field.toLowerCase().includes(searchTerm.toLowerCase())
    //         )
    //     );
    //     setFilteredData(filteredData);
    // }, [apiData, searchTerm, foodOptionFilter]);
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
        .sort((a, b) => b.banID - a.banID);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedData = filteredAndSortedData.slice(startIndex, endIndex);

    const columns: ColumnDef<ITable>[] = [
        {
            accessorKey: "hinhAnhBanURL",
            header: "Ảnh",
            cell: ({row}) => (
                <Avatar className="capitalize">
                    <AvatarImage src={row.getValue("hinhAnhBanURL")}/>
                </Avatar>
            ),
        },
        {
            accessorKey: "soBan",
            header: "Số Bàn",
            cell: ({row}) => (
                <div className="capitalize">Bàn số {row.getValue("soBan")}</div>
            ),
        },
        {
            accessorKey: "tenLoaiBan",
            header: "Loại Bàn",
            cell: ({row}) => (
                <div className="capitalize">{row.getValue("tenLoaiBan")}</div>
            ),
        },
        {
            accessorKey: "soNguoiToiDa",
            header: "Số Người Tối Đa",
            cell: ({row}) => (
                <div className="capitalize">{row.getValue("soNguoiToiDa")}</div>
            ),
        },
        {
            accessorKey: "giaTien",
            header: ({ column }) => {
              return (
                <Button
                  variant="ghost"
                  onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                  Giá Tiền
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              );
            },
            cell: ({ row }) => (
              <div className="lowercase pl-7">{row.getValue("giaTien")} VNĐ</div>
            ),
          },
        {
            id: "actions",
            enableHiding: false,
            cell: ({row}) => {
                const table = row.original;
                return (
                    <>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button
                                    variant="secondary"
                                    className="mx-3"
                                    // onClick={() => setSelectedFoodId(food.monAnID)}
                                >
                                    <FontAwesomeIcon icon={faPenToSquare}/>
                                </Button>
                            </DialogTrigger>
                            {/*<UpDateChefModal reloadData={getAllChefs}/>*/}
                        </Dialog>
                        <Button variant="destructive" onClick={() => HandleDelete(table.banID)}>
                            <FontAwesomeIcon icon={faTrash}/>
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
                {/*<Select onValueChange={handleValueChange} defaultValue={'0'}>*/}
                {/*    <SelectTrigger className="w-[180px] ml-4" value={foodOptionFilter ?? ''}>*/}
                {/*        <SelectValue placeholder="Chọn loại món ăn" />*/}
                {/*    </SelectTrigger>*/}
                {/*    <SelectContent>*/}
                {/*        <SelectItem key="0" value='0'>*/}
                {/*            Tất cả*/}
                {/*        </SelectItem>*/}
                {/*        {*/}
                {/*            apiFoodOptionData.map((option) => (*/}
                {/*                <SelectItem key={option.id} value={`${option.id}`}>*/}
                {/*                    {option.tenLoai}*/}
                {/*                </SelectItem>*/}
                {/*            ))*/}
                {/*        }*/}
                {/*    </SelectContent>*/}
                {/*</Select>*/}

                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="secondary" className="ml-4">
                            Thêm Bàn
                        </Button>
                    </DialogTrigger>
                    <CreateTableModal reloadData={getAllTables}/>
                </Dialog>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="secondary" className="ml-4">
                            <Link href="/tableOptions">
                                Loại Bàn
                            </Link>
                        </Button>
                    </DialogTrigger>
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
                                        <Skeleton className="w-[100px] h-[20px] rounded-full"/>
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
