'use client'

import {Metadata} from "next"
import Image from "next/image"
import {Button} from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Tabs,
    TabsContent,
} from "@/components/ui/tabs"
import {RecentSales} from "@/components/dashboard/recent-sales"
import {Overview} from "@/components/dashboard/overview"
import {usage} from "browserslist";
import {useEffect, useState} from "react";
import HandleBill from "@/api/handleBill";

// export const metadata: Metadata = {
//     title: "Dashboard",
//     description: "Example dashboard app built using the components.",
// }

export default function DashboardPage() {
    const [sumMoney, setSumMoney] = useState([])
    const [sumTable, setSumTable] = useState([])
    const [sumOrder, setSumOrder] = useState([])
    const [sumCustomer, setSumCustomer] = useState([])
    const currencyFormatter = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND',currencyDisplay: 'code' });
    const getData = async () => {
        const money = await HandleBill.getBills("/ThongKe/DoanhThuTheoNgay")
        const table = await HandleBill.getBills("/ThongKe/ThongKeBanDangConSuDung")
        const order = await HandleBill.getBills("/ThongKe/SoLuongHoaDon")
        const customer = await HandleBill.getBills("/ThongKe/ThongKeKhachHang")
        // @ts-ignore
        setSumMoney(money);
        // @ts-ignore
        setSumOrder(order);
        // @ts-ignore
        setSumTable(table);
        // @ts-ignore
        setSumCustomer(customer);
    }
    useEffect(()=>{
        getData()
    },[])
    return (
        <>
            <div className="md:hidden">
                <Image
                    src="/examples/dashboard-light.png"
                    width={1280}
                    height={866}
                    alt="Dashboard"
                    className="block dark:hidden"
                />
                <Image
                    src="/examples/dashboard-dark.png"
                    width={1280}
                    height={866}
                    alt="Dashboard"
                    className="hidden dark:block"
                />
            </div>
            <div className="hidden flex-col md:flex">
                <div className="flex-1 space-y-4 p-8 pt-6">
                    <div className="flex items-center justify-between space-y-2">
                        <h2 className="text-3xl font-bold tracking-tight">Tổng Quan</h2>
                    </div>
                    <Tabs defaultValue="overview" className="space-y-4">
                        <TabsContent value="overview" className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Tổng Doanh Thu
                                        </CardTitle>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className="h-4 w-4 text-muted-foreground"
                                        >
                                            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                                        </svg>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{currencyFormatter.format(sumMoney.tongDoanhThu)}</div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Số Lượng Bàn
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{sumTable.soLuongBan} Bàn</div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Số Lượng Đơn Đặt</CardTitle>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className="h-4 w-4 text-muted-foreground"
                                        >
                                            <rect width="20" height="14" x="2" y="5" rx="2"/>
                                            <path d="M2 10h20"/>
                                        </svg>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{sumOrder.soLuongDon} Đơn</div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Khách hàng
                                        </CardTitle>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className="h-4 w-4 text-muted-foreground"
                                        >
                                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                                            <circle cx="9" cy="7" r="4"/>
                                            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                                        </svg>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{sumCustomer.soLuongKh} Khách Hàng</div>
                                    </CardContent>
                                </Card>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                                <Card className="col-span-4">
                                    <CardHeader>
                                        <CardTitle>Thống Kê</CardTitle>
                                    </CardHeader>
                                    <CardContent className="pl-2">
                                        <Overview/>
                                    </CardContent>
                                </Card>
                                <Card className="col-span-3">
                                    <CardHeader>
                                        <CardTitle>Thanh Toán</CardTitle>
                                        <CardDescription>
                                            Thanh toán theo ngày.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <RecentSales/>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </>
    )
}