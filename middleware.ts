import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isPublicPath = path === '/login';

    // Kiểm tra xem code đang chạy ở phía client hay không
    if (typeof window !== 'undefined') {
        // Lấy giá trị token từ localStorage
        const token = localStorage.getItem('jwt') || '';

        if (isPublicPath && token) {
            return NextResponse.redirect(new URL('/', request.nextUrl));
        }

        if (!isPublicPath && !token) {
            // Nếu không có token và đang ở trang không phải trang đăng nhập,
            // chuyển hướng người dùng về trang đăng nhập
            return NextResponse.redirect(new URL('/login', request.nextUrl));
        }
    } else {
        // Nếu không ở trong môi trường client-side, bạn có thể thực hiện xử lý khác hoặc không làm gì cả
        console.error('Không ở trong môi trường client-side.');
    }
}

export const config = {
    matcher: [
        '/',
        '/dashboard',
        '/admins',
        '/bills',
        '/blogs',
        '/chefs',
        '/contacts',
        '/customers',
        '/feedbacks',
        '/foodOptions',
        '/foods',
        '/roles',
        '/tables',
        '/users',
    ],
};
