export type ICustomer = {
    khachHangID: number;
    hoTen: string;
    ngaySinh: string;
    diaChi: string;
    sdt: string;
};

// variable food component
export type IFood = {
    monAnID: number;
    loaiMonAnID: number;
    tenLoaiMonAn:string;
    tenMon: string;
    moTa: string;
    giaTien: number;
    anhMonAn1URL: string;
    anhMonAn2URL: string;
    anhMonAn3URL: string;
}
export type IFoodOption = {
    id: number;
    tenLoai: string;
    monAn: object;
}
export type ITableOption = {
    loaiBanID: number;
    tenLoaiBan: string;
}
export type ITable = {
    banID: number;
    viTri: string;
    soBan: number;
    soNguoiToiDa: number;
    giaTien: number;
    loaiBanID: number;
    mota: string;
    hinhAnhBanURL
}
export type IChef = {
    id: number;
    hoTen: string;
    anhDauBepURl: string;
    ngaySinh: string;
    sdt: string;
    moTa: string;
}
export type ITable = {
    banID: number;
    loaiBanID: number;
    viTri: string;
    soBan: number;
    soNguoiToiDa: number;
    giaTien: number;
    mota: string;
    hinhAnhBanURL: string;
    tinhTrangHienTai: string;
}
export type IBill = {
    hoaDonID: number;
    khacHangID: number;
    tenKhachHang: string;
    banID: number;
    trangThaiDon: string;
    soBan:number;
    tenHoaDon: string;S
    maGiaoDich: number;
    thoiGianDat: string;
    thoiGianDuKienBatDau: string;
    thoiGianDuKienKetThuc: string;
    thoiGianBatDauThucTe: string;
    thoiGianKetThucThucTe: string;
    thoiGianHuyDat: string;
    ghiChu: string;
    tongTien: number;
    chiTietHoaDonDTOs: object;
    chiTietHoaDonID: number;
    monAnID: number;
    tenMon: string;
    soLuong:number;
    thanhTien:number;
}
export type IUser = {
    userID: number,
    userName: string,
    name: string,
    email: string,
    gender: string,
    avatarUrl: string,
    dateOfBirth: string,
    address: string,
    sdt: string
}