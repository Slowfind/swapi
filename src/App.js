import fetchApi from './utils/api'
import React from 'react'
import { Table } from 'antd'
import 'antd/dist/antd.css'

function App() {
    const [state, setState] = React.useState([])
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        setLoading(true)
        async function getUser(url) {
            try {
                const response = await fetchApi.get(url)

                setTimeout(() => {
                    setLoading(false)
                    setState(response.data)
                }, 1000)
            } catch (e) {
                return <div>axios dno ${e}</div>
            }
        }
        getUser('/')
    }, [])
    // console.log(loading, 'loading')
    console.log(Object.keys(state), 'state')
    const columns = [
        {
            title: 'Номер',
            dataIndex: 'key',
            width: '10%',
        },
        {
            title: 'Название',
            dataIndex: 'title',
            width: '20%',
        },
        {
            title: 'АПИ',
            dataIndex: 'address',
            width: '20%',
        },
        {
            title: '',
            dataIndex: 'button',
            width: '20%',
            render: () => <a>Delete</a>,
        },
    ]
    const data = []
    for (let i = 1; i <= Object.keys(state).length; i++) {
        data.push({
            key: i,
            title: Object.keys(state)[i - 1],
            address: Object.values(state)[i - 1],
            // button: Object.values(state)[i - 1],
        })
    }
    return (
        <Table
            columns={columns}
            bordered
            loading={loading}
            dataSource={data}
            pagination={false}
        />
    )
}

export default App
