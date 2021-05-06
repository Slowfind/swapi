import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'antd'
import 'antd/dist/antd.css'

const div = {
    width: '100%',
    textAlign: 'center',
    padding: '30px 0',
}
function TableSwapi({ link, columns, loading, data, pagination, onChange }) {
    return (
        <>
            {!link && !loading && (
                <div style={div}>
                    <Link className="ant-btn ant-btn-primary" to="/">
                        Назад
                    </Link>
                </div>
            )}
            <Table
                columns={columns}
                bordered
                loading={loading}
                dataSource={data}
                pagination={pagination}
                onChange={onChange}
            />
        </>
    )
}

export default TableSwapi
