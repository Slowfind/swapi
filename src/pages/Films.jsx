import React from 'react'
import moment from 'moment'

import { requestDataSmall } from '../utils/api'
import TableSwapi from '../components/TableSwapi'

function Films() {
    const [state, setState] = React.useState([])
    const [error, setError] = React.useState(null)
    const [gotEveryone, setGotEveryone] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    React.useEffect(() => {
        setLoading(true)
        if (!gotEveryone && !error) {
            setTimeout(() => {
                requestDataSmall('films/', setState, setError, setGotEveryone)
                setLoading(false)
            }, 1000)
        }
    }, [error, gotEveryone])

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
    const data =
        state.results &&
        state.results.map((item, i) => {
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

    return error ? (
        <h1>Ошибка в запросе</h1>
    ) : (
        <TableSwapi
            data={data}
            columns={columns}
            loading={loading}
            pagination={false}
        />
    )
}

export default Films
