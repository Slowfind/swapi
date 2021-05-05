import React from 'react'
import { Link } from 'react-router-dom'
import { requestData } from '../utils/api'
import TableSwapi from '../components/TableSwapi'

function Home() {
    const [state, setState] = React.useState([])
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            requestData(setState, '')
        }, 1000)
    }, [])
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
            render: (_, item) => <Link to={`${item.title}/`}>Открыть апи</Link>,
        },
    ]
    const data = []
    state.forEach((item, i) => {
        for (i = 0; i < Object.keys(item).length; i++) {
            data.push({
                key: i + 1,
                title: Object.keys(item)[i],
                address: Object.values(item)[i],
            })
        }
    })
    return (
        <TableSwapi
            data={data}
            columns={columns}
            loading={loading}
            pagination={false}
        />
    )
}

export default Home
