import { DataFoodTable } from "@/components/food/app.table";


export const metadata = {
  title: 'Món Ăn',
  description: ':List Food By NamJS',
}

const FoodPage = () => {
  return (
    <DataFoodTable/>
  )
}

export default FoodPage;