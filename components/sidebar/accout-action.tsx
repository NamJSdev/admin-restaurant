import {LogOut, Settings, User, UserCircle} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {useSidebarStore} from "@/stores/sidebar-store";
import {cn} from "@/lib/utils";
import {toast} from "react-toastify";

const AccoutAction = () => {
    const router = useRouter();
    const {isMinimal} = useSidebarStore();
    const logout = () => {
        // Khi người dùng đăng xuất
        localStorage.removeItem('jwt');
        router.push("/login");
        toast.success("Đăng xuất tài khoản thành công !")
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="secondary"
                    className={cn(
                        "flex items-center py-1 rounded-lg px-5 opacity-70 w-full justify-start",
                        "hover:opacity-100",
                        isMinimal && "px-1"
                    )}
                >
                    <User className="mr-2 h-4 w-4"/>
                    {!isMinimal && <span>Admin</span>}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Tài Khoản</DropdownMenuLabel>
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4"/>
                        <span>Thông Tin</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4"/>
                        <span>Cài Đặt</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4"/>
                    <span className='cursor-pointer' onClick={logout}>Đăng Xuất</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default AccoutAction;
