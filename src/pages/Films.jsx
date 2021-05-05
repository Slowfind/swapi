import React from 'react'
import moment from 'moment'

import { requestData } from '../utils/api'
import TableSwapi from '../components/TableSwapi'

function Films() {
    const [state, setState] = React.useState([])
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            requestData(setState, 'films/')
        }, 1000)
    }, [])
    const columns = [
        {
            title: 'Загаловок',
            dataIndex: 'title',
        },
        {
            title: 'Эпизод',
            dataIndex: 'episode',
        },
        {
            title: 'Режиссер',
            dataIndex: 'director',
        },
        {
            title: 'Премьера',
            dataIndex: 'release',
        },
        {
            title: 'Создано',
            dataIndex: 'created',
        },
        {
            title: 'Отредактировано',
            dataIndex: 'edited',
        },
    ]
    const data = state.map((item, i) => {
        return {
            key: i,
            title: item.title,
            episode: item.episode_id,
            director: item.director,
            release: item.release_date,
            created: moment(item.created).format('LLL'),
            edited: moment(item.edited).format('LLL'),
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

export default Films
