import { Table } from "antd"

export const DataTable = ({ columns, rows, loading }) => {
  return (
    <Table columns={columns} dataSource={rows} pagination loading={loading} />
  )
}