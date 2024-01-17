import { DataChefTable } from "@/components/chef/app.table"

export const metadata = {
  title: 'Đầu Bếp',
  description: ':List Chef By NamJS',
}

const ChefPage = () => {
  return (
    <DataChefTable/>
  )
}

export default ChefPage