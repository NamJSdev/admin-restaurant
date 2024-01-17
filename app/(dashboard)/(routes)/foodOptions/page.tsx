import { DataFoodOptionTable } from "@/components/foodOptions/app.table";
export const metadata = {
    title: 'Loại Món Ăn',
    description: ':List Food Options By NamJS',
}
const FoodOptions = () => {
    return(
        <DataFoodOptionTable/>
    )
}
export default FoodOptions