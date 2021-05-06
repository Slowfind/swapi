/* immport libraries */
import React from 'react'
import moment from 'moment'

/* import components */
import { requestData } from '../utils/api'
import TableSwapi from '../components/TableSwapi'

function Vehicles() {
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
                    'vehicles'
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
            title: 'Модель',
            dataIndex: 'model',
        },
        {
            title: 'Вместимость',
            dataIndex: 'passengers',
        },
        {
            title: 'Количество материалов',
            dataIndex: 'consumables',
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
            model: item.model,
            passengers: item.passengers,
            consumables: item.consumables,
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

export default Vehicles
