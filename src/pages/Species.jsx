/* immport libraries */
import React from 'react'
import moment from 'moment'

/* import components */
import { requestData } from '../utils/api'
import TableSwapi from '../components/TableSwapi'

function Species() {
    const [page, setPage] = React.useState(1)
    const [state, setState] = React.useState([])
    const [gotEveryone, setGotEveryone] = React.useState(false)
    const [error, setError] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
    React.useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            if (!gotEveryone && !error) {
                requestData(
                    setLoading,
                    setState,
                    setError,
                    setPage,
                    setGotEveryone,
                    page,
                    'species'
                )
            }
        }, 100)
    }, [page]) // eslint-disable-line
    React.useEffect(() => {
        return () => {
            setState([])
        }
    }, [])
    const columns = [
        {
            title: 'Название',
            dataIndex: 'name',
        },
        {
            title: 'Язык',
            dataIndex: 'language',
        },
        {
            title: 'Разновидность',
            dataIndex: 'classification',
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
            name: item.name,
            language: item.language,
            classification: item.classification,
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
            pagination={true}
        />
    )
}

export default Species
