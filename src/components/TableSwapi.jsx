import React from 'react'
import { Table } from 'antd'
import 'antd/dist/antd.css'

function TableSwapi({ columns, loading, data, pagination, onChange }) {
    return (
        <Table
            columns={columns}
            bordered
            loading={loading}
            dataSource={data}
            pagination={pagination}
            onChange={onChange}
        />
    )
}

export default TableSwapi
